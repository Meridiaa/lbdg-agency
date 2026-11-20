import { Resend } from 'resend';
import { Lead } from './types';
import { DEFAULT_AGENCY_SETTINGS } from './constants';

const resendApiKey = process.env.RESEND_API_KEY || '';
export const isResendConfigured = Boolean(resendApiKey);

const resend = isResendConfigured ? new Resend(resendApiKey) : null;

// Agency Notification Email Template
export function generateAgencyNotificationHtml(lead: Lead): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #101412; color: #f5f5f0; margin: 0; padding: 24px; }
          .container { max-width: 600px; margin: 0 auto; background-color: #151b17; border: 1px solid #ffffff1f; border-radius: 8px; padding: 32px; }
          .header { border-bottom: 1px solid #ffffff1f; padding-bottom: 20px; margin-bottom: 24px; }
          .badge { display: inline-block; background-color: #d5ff6520; color: #d5ff65; border: 1px solid #d5ff65; padding: 4px 10px; font-size: 11px; font-weight: 700; border-radius: 4px; }
          h1 { color: #f5f5f0; font-size: 24px; margin: 12px 0 6px; }
          .field { margin-bottom: 16px; }
          .label { color: #9ca39d; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
          .value { color: #f5f5f0; font-size: 15px; font-weight: 500; }
          .message-box { background-color: #0e130f; border-left: 3px solid #d5ff65; padding: 16px; margin-top: 20px; font-size: 14px; line-height: 1.6; color: #f5f5f0; }
          .cta-btn { display: inline-block; background-color: #d5ff65; color: #101412; padding: 12px 20px; text-decoration: none; font-weight: 700; font-size: 13px; border-radius: 4px; margin-top: 24px; }
          .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #ffffff1f; color: #9ca39d; font-size: 11px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="badge">NEW CLIENT LEAD</span>
            <h1>Inquiry Received #${lead.lead_number}</h1>
            <p style="color: #9ca39d; font-size: 13px; margin: 0;">LBDG Agency Automated Lead Dispatcher</p>
          </div>

          <div class="field">
            <div class="label">Client Name</div>
            <div class="value">${escapeHtml(lead.name)}</div>
          </div>

          <div class="field">
            <div class="label">Email Address</div>
            <div class="value"><a href="mailto:${escapeHtml(lead.email)}" style="color: #d5ff65;">${escapeHtml(lead.email)}</a></div>
          </div>

          <div class="field">
            <div class="label">Phone / WhatsApp</div>
            <div class="value">${lead.phone ? `<a href="https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}" style="color: #25d366;">${escapeHtml(lead.phone)} (WhatsApp ↗)</a>` : 'Not provided'}</div>
          </div>

          <div class="field">
            <div class="label">Service Required</div>
            <div class="value">${escapeHtml(lead.service)}</div>
          </div>

          ${lead.budget ? `
          <div class="field">
            <div class="label">Estimated Budget</div>
            <div class="value">${escapeHtml(lead.budget)}</div>
          </div>
          ` : ''}

          <div class="field">
            <div class="label">Project Details &amp; Objectives</div>
            <div class="message-box">${escapeHtml(lead.message).replace(/\n/g, '<br/>')}</div>
          </div>

          <a href="mailto:${escapeHtml(lead.email)}?subject=Re: Your Inquiry with LBDG Agency [${lead.lead_number}]" class="cta-btn">
            Reply to ${escapeHtml(lead.name)} ↗
          </a>

          <div class="footer">
            Received on ${new Date(lead.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST<br/>
            LBDG Agency Management System
          </div>
        </div>
      </body>
    </html>
  `;
}

// Customer Confirmation Email Template
export function generateCustomerConfirmationHtml(lead: Lead): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #101412; color: #f5f5f0; margin: 0; padding: 24px; }
          .container { max-width: 600px; margin: 0 auto; background-color: #151b17; border: 1px solid #ffffff1f; border-radius: 8px; padding: 36px; }
          .brand { font-size: 26px; font-weight: 800; letter-spacing: -1px; margin-bottom: 24px; color: #f5f5f0; }
          .brand span { color: #d5ff65; }
          h1 { color: #f5f5f0; font-size: 22px; margin-bottom: 12px; }
          p { color: #cfd6d1; font-size: 14px; line-height: 1.8; margin-bottom: 16px; }
          .lead-pill { display: inline-block; background-color: #0e130f; border: 1px dashed #d5ff65; color: #d5ff65; font-family: monospace; padding: 10px 16px; font-size: 13px; font-weight: 700; margin: 16px 0; }
          .highlight-box { background-color: #1b211d; border-radius: 6px; padding: 20px; margin: 24px 0; border-left: 3px solid #d5ff65; }
          .footer { margin-top: 36px; padding-top: 20px; border-top: 1px solid #ffffff1f; color: #9ca39d; font-size: 12px; line-height: 1.6; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="brand">LBDG<span>.</span></div>
          <h1>Thank you for reaching out, ${escapeHtml(lead.name)}.</h1>
          <p>
            We have received your project inquiry for <strong>${escapeHtml(lead.service)}</strong>. Our team is reviewing your requirements and will reach out to you within 24 business hours to discuss the next steps.
          </p>

          <p>Your unique reference code is:</p>
          <div class="lead-pill">${lead.lead_number}</div>

          <div class="highlight-box">
            <h4 style="margin: 0 0 8px; color: #f5f5f0; font-size: 14px;">Need an immediate response?</h4>
            <p style="margin: 0; font-size: 13px;">
              You can connect with our strategy lead directly on WhatsApp at 
              <a href="https://wa.me/919838686391?text=Hi%20LBDG,%20following%20up%20on%20my%20inquiry%20${lead.lead_number}" style="color: #25d366; font-weight: 700;">
                +91 9838686391 (Click to Chat ↗)
              </a>
            </p>
          </div>

          <p>
            We look forward to building something impactful together.
          </p>

          <div class="footer">
            <strong>LBDG Agency</strong><br/>
            Creative thinking. Digital growth.<br/>
            Official Website: <a href="https://lbdg-agency.vercel.app" style="color: #d5ff65;">https://lbdg-agency.vercel.app</a>
          </div>
        </div>
      </body>
    </html>
  `;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function sendLeadEmails(lead: Lead): Promise<{ notification: boolean; confirmation: boolean; error?: string }> {
  const agencyEmail = process.env.AGENCY_NOTIFICATION_EMAIL || DEFAULT_AGENCY_SETTINGS.official_email;
  const fromEmail = process.env.RESEND_FROM_EMAIL || '';

  let notificationSuccess = false;
  let confirmationSuccess = false;
  let lastError: string | undefined;

  if (resend && fromEmail && agencyEmail) {
    try {
      // 1. Send Agency Notification
      const notifyResult = await resend.emails.send({
        from: fromEmail,
        to: agencyEmail,
        subject: `[New Lead #${lead.lead_number}] ${lead.name} — ${lead.service}`,
        html: generateAgencyNotificationHtml(lead),
      });

      if (!notifyResult.error) {
        notificationSuccess = true;
      } else {
        lastError = `Agency email error: ${notifyResult.error.message}`;
        console.error(lastError);
      }
    } catch (err: any) {
      lastError = `Agency send exception: ${err.message}`;
      console.error(lastError);
    }

    try {
      // 2. Send Customer Confirmation
      const confirmResult = await resend.emails.send({
        from: fromEmail,
        to: lead.email,
        subject: `We received your inquiry — LBDG Agency [${lead.lead_number}]`,
        html: generateCustomerConfirmationHtml(lead),
      });

      if (!confirmResult.error) {
        confirmationSuccess = true;
      } else {
        console.error(`Customer confirmation email error: ${confirmResult.error.message}`);
      }
    } catch (err: any) {
      console.error('Customer send exception:', err.message);
    }
  } else {
    lastError = 'Email delivery is not configured. No email was sent.';
    console.error(lastError);
  }

  return {
    notification: notificationSuccess,
    confirmation: confirmationSuccess,
    error: lastError,
  };
}
