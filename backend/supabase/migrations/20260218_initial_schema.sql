-- ==============================================================================
-- LBDG Agency - PostgreSQL Database Schema & Migrations
-- Phase 3 Implementation: Leads, Services, Portfolio, Testimonials, Settings, Notes
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Admin Profiles & Roles Table
CREATE TABLE IF NOT EXISTS public.admin_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'editor')),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Customer Leads Table
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_number TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    service TEXT NOT NULL,
    budget TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_progress', 'converted', 'closed')),
    consent BOOLEAN NOT NULL DEFAULT TRUE,
    ip_address TEXT,
    user_agent TEXT,
    notification_sent BOOLEAN NOT NULL DEFAULT FALSE,
    notification_error TEXT,
    confirmation_sent BOOLEAN NOT NULL DEFAULT FALSE,
    confirmation_error TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Lead Activity & Internal Notes Table
CREATE TABLE IF NOT EXISTS public.lead_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
    author_email TEXT NOT NULL,
    content TEXT NOT NULL,
    follow_up_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Services Table (CMS)
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    number TEXT NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    deliverables JSONB NOT NULL DEFAULT '[]'::jsonb,
    order_index INT NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Portfolio Projects Table (CMS)
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    tag TEXT NOT NULL CHECK (tag IN ('Branding', 'Digital', 'Social Media')),
    year TEXT NOT NULL DEFAULT '2026',
    theme_class TEXT NOT NULL DEFAULT 'project-modern',
    initials TEXT NOT NULL,
    summary TEXT NOT NULL,
    deliverables JSONB NOT NULL DEFAULT '[]'::jsonb,
    client TEXT NOT NULL,
    order_index INT NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Testimonials Table (CMS)
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_name TEXT NOT NULL,
    client_role TEXT NOT NULL,
    company TEXT NOT NULL,
    quote TEXT NOT NULL,
    rating INT NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    service TEXT NOT NULL,
    order_index INT NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Agency Settings Singleton Table
CREATE TABLE IF NOT EXISTS public.agency_settings (
    id TEXT PRIMARY KEY DEFAULT 'agency_settings_singleton',
    agency_name TEXT NOT NULL DEFAULT 'LBDG Agency',
    official_email TEXT NOT NULL DEFAULT 'contact@lbdg.agency',
    official_phone TEXT NOT NULL DEFAULT '+91 9838686391',
    whatsapp_number TEXT NOT NULL DEFAULT '+91 9838686391',
    address TEXT NOT NULL DEFAULT 'India (Serving Global Clients Online)',
    working_hours TEXT NOT NULL DEFAULT 'Monday – Saturday: 9:00 AM – 7:00 PM IST',
    ga_id TEXT,
    gsc_id TEXT,
    google_business_url TEXT,
    instagram_url TEXT DEFAULT '#',
    linkedin_url TEXT DEFAULT '#',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. Automatic Updated At Timestamp Function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply Triggers
DROP TRIGGER IF EXISTS set_leads_updated_at ON public.leads;
CREATE TRIGGER set_leads_updated_at
BEFORE UPDATE ON public.leads
FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS set_services_updated_at ON public.services;
CREATE TRIGGER set_services_updated_at
BEFORE UPDATE ON public.services
FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS set_portfolio_updated_at ON public.portfolio_projects;
CREATE TRIGGER set_portfolio_updated_at
BEFORE UPDATE ON public.portfolio_projects
FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS set_testimonials_updated_at ON public.testimonials;
CREATE TRIGGER set_testimonials_updated_at
BEFORE UPDATE ON public.testimonials
FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

DROP TRIGGER IF EXISTS set_settings_updated_at ON public.agency_settings;
CREATE TRIGGER set_settings_updated_at
BEFORE UPDATE ON public.agency_settings
FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

-- ==============================================================================
-- 10. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agency_settings ENABLE ROW LEVEL SECURITY;

-- Helper function to check if caller is an active admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.admin_profiles
        WHERE id = auth.uid() AND is_active = TRUE
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Leads: Public can INSERT only (contact form). Admin can SELECT, UPDATE, DELETE.
CREATE POLICY "Public can submit inquiries" ON public.leads
    FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Admins have full access to leads" ON public.leads
    FOR ALL USING (public.is_admin());

-- Lead Notes: Admins only
CREATE POLICY "Admins have full access to lead notes" ON public.lead_notes
    FOR ALL USING (public.is_admin());

-- Services: Public can view published; Admins can do everything
CREATE POLICY "Public can view published services" ON public.services
    FOR SELECT USING (is_published = TRUE);

CREATE POLICY "Admins have full access to services" ON public.services
    FOR ALL USING (public.is_admin());

-- Portfolio Projects: Public can view published; Admins can do everything
CREATE POLICY "Public can view published portfolio" ON public.portfolio_projects
    FOR SELECT USING (is_published = TRUE);

CREATE POLICY "Admins have full access to portfolio" ON public.portfolio_projects
    FOR ALL USING (public.is_admin());

-- Testimonials: Public can view published; Admins can do everything
CREATE POLICY "Public can view published testimonials" ON public.testimonials
    FOR SELECT USING (is_published = TRUE);

CREATE POLICY "Admins have full access to testimonials" ON public.testimonials
    FOR ALL USING (public.is_admin());

-- Agency Settings: Public can read; Admins can update
CREATE POLICY "Public can read agency settings" ON public.agency_settings
    FOR SELECT USING (TRUE);

CREATE POLICY "Admins can update agency settings" ON public.agency_settings
    FOR ALL USING (public.is_admin());

-- Admin Profiles: Admins can view own profile; Super admins can view all
CREATE POLICY "Users can view own admin profile" ON public.admin_profiles
    FOR SELECT USING (auth.uid() = id);

-- ==============================================================================
-- 11. INITIAL SEED DATA
-- ==============================================================================

-- Insert Default Settings
INSERT INTO public.agency_settings (id, agency_name, official_email, official_phone, whatsapp_number, address, working_hours)
VALUES (
    'agency_settings_singleton',
    'LBDG Agency',
    'contact@lbdg.agency',
    '+91 9838686391',
    '+91 9838686391',
    'India (Serving Global Clients Online)',
    'Monday – Saturday: 9:00 AM – 7:00 PM IST'
)
ON CONFLICT (id) DO NOTHING;
