
import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/adminAuth';
import { INITIAL_TESTIMONIALS } from '@/lib/constants';

let testimonialsStore = [...INITIAL_TESTIMONIALS];

export async function GET() {
  return NextResponse.json({
    success: true,
    testimonials: testimonialsStore,
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

  const newTestimonial = {
    ...body,
    id: `test_${Date.now()}`,
    order_index: testimonialsStore.length + 1,
    is_published: true,
  };

  testimonialsStore.push(newTestimonial);

  return NextResponse.json({
    success: true,
    testimonial: newTestimonial,
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
  const index = testimonialsStore.findIndex((t) => t.id === body.id);

  if (index === -1) {
    return NextResponse.json(
      { success: false, error: 'Testimonial not found' },
      { status: 404 }
    );
  }

  testimonialsStore[index] = {
    ...testimonialsStore[index],
    ...body,
  };

  return NextResponse.json({
    success: true,
    testimonial: testimonialsStore[index],
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

  testimonialsStore = testimonialsStore.filter((t) => t.id !== id);

  return NextResponse.json({
    success: true,
    message: 'Testimonial deleted',
  });
}

