
-- LBDG Agency security hardening migration
-- Do not rerun the original schema migration.

-- 1. Secure the admin-check function.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_profiles AS ap
    WHERE ap.id = (SELECT auth.uid())
      AND ap.is_active = TRUE
  );
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated;

-- 2. Remove anonymous lead insertion.
-- The server-side service-role client handles contact submissions.
DROP POLICY IF EXISTS "Public can submit inquiries" ON public.leads;

-- 3. Restrict lead access to authenticated active admins.
DROP POLICY IF EXISTS "Admins have full access to leads" ON public.leads;

CREATE POLICY "Active admins manage leads"
ON public.leads
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- 4. Restrict lead notes to authenticated active admins.
DROP POLICY IF EXISTS "Admins have full access to lead notes" ON public.lead_notes;

CREATE POLICY "Active admins manage lead notes"
ON public.lead_notes
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- 5. Keep public access to published CMS content.
-- Admin writes require an active admin profile.
DROP POLICY IF EXISTS "Admins have full access to services" ON public.services;

CREATE POLICY "Active admins manage services"
ON public.services
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins have full access to portfolio" ON public.portfolio_projects;

CREATE POLICY "Active admins manage portfolio"
ON public.portfolio_projects
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Admins have full access to testimonials" ON public.testimonials;

CREATE POLICY "Active admins manage testimonials"
ON public.testimonials
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- 6. Restrict settings to authenticated active admins.
-- A separate safe public endpoint will expose only public fields.
DROP POLICY IF EXISTS "Public can read agency settings" ON public.agency_settings;
DROP POLICY IF EXISTS "Admins can update agency settings" ON public.agency_settings;

CREATE POLICY "Active admins manage agency settings"
ON public.agency_settings
FOR ALL
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- 7. Admins can read their own profile.
-- No self-service role or active-status updates are permitted.
DROP POLICY IF EXISTS "Users can view own admin profile" ON public.admin_profiles;

CREATE POLICY "Users can view own admin profile"
ON public.admin_profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- 8. Correct the agency's existing settings.
UPDATE public.agency_settings
SET
  agency_name = 'LBDG Agency',
  official_email = 'lbdgagency@gmail.com',
  official_phone = '+91 9838686391',
  whatsapp_number = '919838686391',
  address = 'A-23, A Block, Sector 10, Noida, Uttar Pradesh',
  working_hours = '10:00 AM – 6:00 PM'
WHERE id = 'agency_settings_singleton';

-- 9. Add useful indexes for dashboard queries.
CREATE INDEX IF NOT EXISTS idx_leads_created_at
ON public.leads (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_leads_status
ON public.leads (status);

CREATE INDEX IF NOT EXISTS idx_lead_notes_lead_id
ON public.lead_notes (lead_id);

CREATE INDEX IF NOT EXISTS idx_services_order_index
ON public.services (order_index);

CREATE INDEX IF NOT EXISTS idx_portfolio_order_index
ON public.portfolio_projects (order_index);

CREATE INDEX IF NOT EXISTS idx_testimonials_order_index
ON public.testimonials (order_index);
