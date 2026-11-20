
import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/adminAuth';
import { INITIAL_PORTFOLIO } from '@/lib/constants';

let portfolioStore = [...INITIAL_PORTFOLIO];

export async function GET() {
  return NextResponse.json({
    success: true,
    portfolio: portfolioStore,
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

  const newProject = {
    ...body,
    id: `proj_${Date.now()}`,
    order_index: portfolioStore.length + 1,
    is_published: true,
  };

  portfolioStore.push(newProject);

  return NextResponse.json({
    success: true,
    project: newProject,
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
  const index = portfolioStore.findIndex((p) => p.id === body.id);

  if (index === -1) {
    return NextResponse.json(
      { success: false, error: 'Project not found' },
      { status: 404 }
    );
  }

  portfolioStore[index] = {
    ...portfolioStore[index],
    ...body,
  };

  return NextResponse.json({
    success: true,
    project: portfolioStore[index],
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

  portfolioStore = portfolioStore.filter((p) => p.id !== id);

  return NextResponse.json({
    success: true,
    message: 'Project deleted',
  });
}

