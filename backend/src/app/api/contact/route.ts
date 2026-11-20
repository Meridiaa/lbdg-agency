import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createLead, updateLeadNotificationStatus } from '@/lib/supabaseAdmin';
import { sendLeadEmails } from '@/lib/resend';
import { isRateLimited } from '@/lib/rateLimit';

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().trim().email('Please provide a valid email address').max(150),
  phone: z.string().trim().max(30).optional().nullable(),
  service: z.string().trim().min(2, 'Please select a service'),
  budget: z.string().trim().optional().nullable(),
  message: z.string().trim().min(10, 'Message must be at least 10 characters').max(3000),
  consent: z.boolean().refine((val) => val === true, {
    message: 'You must consent to our privacy policy to proceed',
  }),
  honeypot: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    // 0. Payload Size Guard (Max 64KB)
    const contentLength = req.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > 65536) {
      return NextResponse.json(
        { success: false, error: 'Payload too large. Maximum size is 64KB.' },
        { status: 413 }
      );
    }

    // 1. IP Extraction & Rate Limiting (15 inquiries per minute per IP)
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'anonymous';
    if (isRateLimited(ip, 15, 60000)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please wait a minute before submitting again.' },
        { status: 429 }
      );
    }

    // 2. Parse and Validate Body
    const body = await req.json();

    // Spam Protection: Honeypot check
    if (body.honeypot && body.honeypot.trim() !== '') {
      // Silently reject bots without error details
      return NextResponse.json({ success: true, lead_number: 'LBDG-PROCESSED' });
    }

    const validation = contactSchema.safeParse(body);
    if (!validation.success) {
      const errorMsg = validation.error.issues[0]?.message || 'Invalid input data';
      return NextResponse.json({ success: false, error: errorMsg }, { status: 400 });
    }

    const { name, email, phone, service, budget, message, consent } = validation.data;

    // 3. Database Insertion (MUST happen before email notification)
    const lead = await createLead({
      name,
      email,
      phone: phone || null,
      service,
      budget: budget || null,
      message,
      consent,
      ip_address: ip,
    });

    // 4. Send Transactional Emails
    // Failures in email delivery must NEVER fail or delete the saved lead
    let emailStatus = { notification: false, confirmation: false };
    try {
      emailStatus = await sendLeadEmails(lead);
      await updateLeadNotificationStatus(lead.id, {
        notification_sent: emailStatus.notification,
        confirmation_sent: emailStatus.confirmation,
      });
    } catch (emailErr: any) {
      console.error('Email dispatcher error (lead preserved safely):', emailErr?.message);
      await updateLeadNotificationStatus(lead.id, {
        notification_sent: false,
        confirmation_sent: false,
        notification_error: emailErr?.message || 'Email delivery exception',
      });
    }

    return NextResponse.json({
      success: true,
      lead_number: lead.lead_number,
      message: 'Your inquiry has been successfully received.',
      notification_sent: emailStatus.notification,
    });
  } catch (err: any) {
    console.error('API /contact error:', err);
    return NextResponse.json(
      { success: false, error: 'An unexpected server error occurred. Please try again or message us directly on WhatsApp.' },
      { status: 500 }
    );
  }
}
