import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/adminAuth';
import { DEFAULT_AGENCY_SETTINGS } from '@/lib/constants';

let settingsStore = { ...DEFAULT_AGENCY_SETTINGS };

export async function GET() {
  return NextResponse.json({ success: true, settings: settingsStore });
}

export async function PUT(req: NextRequest) {
  if (!(await verifyAdminSession())) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  settingsStore = {
    ...settingsStore,
    ...body,
    updated_at: new Date().toISOString(),
  };

  return NextResponse.json({ success: true, settings: settingsStore });
}

