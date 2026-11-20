export type LeadStatus = 'new' | 'contacted' | 'in_progress' | 'converted' | 'closed';

export interface Lead {
  id: string;
  lead_number: string;
  name: string;
  email: string;
  phone: string | null;
  service: string;
  budget: string | null;
  message: string;
  status: LeadStatus;
  consent: boolean;
  ip_address?: string | null;
  notification_sent: boolean;
  confirmation_sent: boolean;
  notes_count?: number;
  created_at: string;
  updated_at: string;
}

export interface LeadNote {
  id: string;
  lead_id: string;
  author_email: string;
  content: string;
  follow_up_date: string | null;
  created_at: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  short_description: string;
  full_description: string;
  deliverables: string[];
  order_index: number;
  is_published: boolean;
}

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  category: string;
  tag: 'Branding' | 'Digital' | 'Social Media';
  year: string;
  theme_class: string;
  initials: string;
  summary: string;
  deliverables: string[];
  client: string;
  order_index: number;
  is_published: boolean;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_role: string;
  company: string;
  quote: string;
  rating: number;
  service: string;
  is_published: boolean;
  order_index: number;
}

export interface AgencySettings {
  id: string;
  agency_name: string;
  official_email: string;
  official_phone: string;
  whatsapp_number: string;
  address: string;
  working_hours: string;
  ga_id: string | null;
  gsc_id: string | null;
  google_business_url: string | null;
  instagram_url: string | null;
  linkedin_url: string | null;
  updated_at: string;
}
