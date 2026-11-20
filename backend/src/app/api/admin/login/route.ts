
import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabaseServer';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().trim().email().max(150),
  password: z.string().min(1).max(256),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'A valid email and password are required.',
        },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase(),
      password,
    });

    if (error || !data.user) {
      return NextResponse.json(
        { success: false, error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    const { data: profile, error: profileError } = await supabase
      .from('admin_profiles')
      .select('id, email, full_name, role, is_active')
      .eq('id', data.user.id)
      .maybeSingle();

    if (profileError || !profile || !profile.is_active) {
      await supabase.auth.signOut();

      return NextResponse.json(
        {
          success: false,
          error: 'This account is not authorized to access the admin dashboard.',
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Authentication successful.',
      user: {
        id: profile.id,
        email: profile.email,
        full_name: profile.full_name,
        role: profile.role,
      },
    });
  } catch (error) {
    console.error('Admin login error:', error);

    return NextResponse.json(
      { success: false, error: 'Unable to complete login.' },
      { status: 500 }
    );
  }
}
