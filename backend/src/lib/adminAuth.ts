
import { createSupabaseServerClient } from '@/lib/supabaseServer';

export type AdminRole = 'super_admin' | 'admin' | 'editor';

export interface AdminProfile {
  id: string;
  email: string;
  full_name: string;
  role: AdminRole;
  is_active: boolean;
}

export async function getAdminContext() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return null;
  }

  const { data: profile, error: profileError } = await supabase
    .from('admin_profiles')
    .select('id, email, full_name, role, is_active')
    .eq('id', user.id)
    .maybeSingle();

  if (profileError || !profile || !profile.is_active) {
    return null;
  }

  return {
    user,
    profile: profile as AdminProfile,
    supabase,
  };
}

export async function hasAdminRole(
  allowedRoles: AdminRole[]
): Promise<boolean> {
  const context = await getAdminContext();

  if (!context) {
    return false;
  }

  return allowedRoles.includes(context.profile.role);
}

/**
 * Temporary compatibility helper for existing admin API routes.
 * Uses Supabase Auth and active admin profile verification.
 */
export async function verifyAdminSession(): Promise<boolean> {
  const context = await getAdminContext();
  return Boolean(context);
}
