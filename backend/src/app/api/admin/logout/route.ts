
import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabaseServer';

export async function POST() {
  try {
    const supabase = await createSupabaseServerClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Admin logout error:', error);

      return NextResponse.json(
        { success: false, error: 'Unable to log out.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Logged out successfully.',
    });
  } catch (error) {
    console.error('Admin logout error:', error);

    return NextResponse.json(
      { success: false, error: 'Unable to log out.' },
      { status: 500 }
    );
  }
}
