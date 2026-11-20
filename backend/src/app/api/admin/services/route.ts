
import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/adminAuth';
import { INITIAL_SERVICES } from '@/lib/constants';

let servicesStore = [...INITIAL_SERVICES];

export async function GET() {
  return NextResponse.json({
    success: true,
    services: servicesStore,
  });
}

export async function POST(req: NextRequest) {
  if (!(await verifyAdminSession())) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const body = await req.json();

  const newService = {
    ...body,
    id: `srv_${Date.now()}`,
    order_index: servicesStore.length + 1,
    is_published: true,
  };

  servicesStore.push(newService);

  return NextResponse.json({
    success: true,
    service: newService,
  });
}

export async function PUT(req: NextRequest) {
  if (!(await verifyAdminSession())) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const body = await req.json();
  const index = servicesStore.findIndex((s) => s.id === body.id);

  if (index === -1) {
    return NextResponse.json(
      { success: false, error: 'Service not found' },
      { status: 404 }
    );
  }

  servicesStore[index] = {
    ...servicesStore[index],
    ...body,
  };

  return NextResponse.json({
    success: true,
    service: servicesStore[index],
  });
}

export async function DELETE(req: NextRequest) {
  if (!(await verifyAdminSession())) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  servicesStore = servicesStore.filter((s) => s.id !== id);

  return NextResponse.json({
    success: true,
    message: 'Service deleted',
  });
}

