
import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/adminAuth';
import {
  getLeads,
  updateLeadStatus,
  addLeadNote,
} from '@/lib/supabaseAdmin';
import { LeadStatus } from '@/lib/types';

export async function GET(req: NextRequest) {
  if (!(await verifyAdminSession())) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search')?.toLowerCase();
  const status = searchParams.get('status');
  const exportFormat = searchParams.get('export');

  let leads = await getLeads();

  if (status && status !== 'all') {
    leads = leads.filter((l) => l.status === status);
  }

  if (search) {
    leads = leads.filter(
      (l) =>
        l.name.toLowerCase().includes(search) ||
        l.email.toLowerCase().includes(search) ||
        (l.phone && l.phone.toLowerCase().includes(search)) ||
        l.lead_number.toLowerCase().includes(search) ||
        l.service.toLowerCase().includes(search)
    );
  }

  if (exportFormat === 'csv') {
    const headers = [
      'Lead Number',
      'Date',
      'Name',
      'Email',
      'Phone',
      'Service',
      'Budget',
      'Status',
      'Message',
    ];

    const escapeCsv = (value: string) =>
      `"${value.replace(/"/g, '""')}"`;

    const rows = leads.map((l) => [
      escapeCsv(l.lead_number),
      escapeCsv(new Date(l.created_at).toISOString()),
      escapeCsv(l.name),
      escapeCsv(l.email),
      escapeCsv(l.phone || ''),
      escapeCsv(l.service),
      escapeCsv(l.budget || ''),
      escapeCsv(l.status),
      escapeCsv(l.message),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="lbdg-leads-${new Date()
          .toISOString()
          .slice(0, 10)}.csv"`,
      },
    });
  }

  return NextResponse.json({
    success: true,
    leads,
  });
}

export async function PATCH(req: NextRequest) {
  if (!(await verifyAdminSession())) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: 'Lead ID and status required' },
        { status: 400 }
      );
    }

    const success = await updateLeadStatus(id, status as LeadStatus);

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Lead not found or update failed' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Status updated',
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Update error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!(await verifyAdminSession())) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const {
      lead_id,
      content,
      follow_up_date,
      author_email,
    } = await req.json();

    if (!lead_id || !content) {
      return NextResponse.json(
        { success: false, error: 'lead_id and content required' },
        { status: 400 }
      );
    }

    const note = await addLeadNote(
      lead_id,
      author_email || 'admin@lbdg.agency',
      content,
      follow_up_date || null
    );

    return NextResponse.json({
      success: true,
      note,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Note creation failed' },
      { status: 500 }
    );
  }
}

