import { createClient } from '@supabase/supabase-js';
import { Lead, LeadNote, ServiceItem, PortfolioProject, Testimonial, AgencySettings } from './types';
import { INITIAL_SERVICES, INITIAL_PORTFOLIO, INITIAL_TESTIMONIALS, DEFAULT_AGENCY_SETTINGS } from './constants';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export const isServerSupabaseConfigured = Boolean(supabaseUrl && supabaseServiceKey);

export const supabaseAdmin = isServerSupabaseConfigured
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;

// In-Memory store for local development / demo fallback
interface LocalStore {
  leads: Lead[];
  leadNotes: LeadNote[];
  services: ServiceItem[];
  portfolio: PortfolioProject[];
  testimonials: Testimonial[];
  settings: AgencySettings;
}

const localStore: LocalStore = {
  leads: [],
  leadNotes: [],
  services: [...INITIAL_SERVICES],
  portfolio: [...INITIAL_PORTFOLIO],
  testimonials: [...INITIAL_TESTIMONIALS],
  settings: { ...DEFAULT_AGENCY_SETTINGS },
};

export async function createLead(leadData: Omit<Lead, 'id' | 'lead_number' | 'created_at' | 'updated_at' | 'status' | 'notification_sent' | 'confirmation_sent'>): Promise<Lead> {
  if (!supabaseAdmin) {
    throw new Error('Database is not configured. Inquiry was not accepted.');
  }

  const lead_number = `LBDG-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;

  const { data, error } = await supabaseAdmin
    .from('leads')
    .insert({
      lead_number,
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone,
      service: leadData.service,
      budget: leadData.budget,
      message: leadData.message,
      consent: leadData.consent,
      ip_address: leadData.ip_address ?? null,
      status: 'new',
      notification_sent: false,
      confirmation_sent: false,
    })
    .select()
    .single();

  if (error || !data) {
    console.error('Lead persistence failed:', error?.message);
    throw new Error('We could not safely save your enquiry. Please try again or contact us on WhatsApp.');
  }

  return data as Lead;
}

export async function updateLeadStatus(id: string, status: Lead['status']): Promise<boolean> {
  if (supabaseAdmin) {
    try {
      const { error } = await supabaseAdmin
        .from('leads')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (!error) return true;
    } catch (err) {
      console.error('Failed to update lead status in Supabase:', err);
    }
  }

  const lead = localStore.leads.find((l) => l.id === id);
  if (lead) {
    lead.status = status;
    lead.updated_at = new Date().toISOString();
    return true;
  }
  return false;
}

export async function getLeads(): Promise<Lead[]> {
  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) return data as Lead[];
    } catch (err) {
      console.error('Failed to fetch leads from Supabase:', err);
    }
  }
  return localStore.leads;
}

export async function addLeadNote(lead_id: string, author_email: string, content: string, follow_up_date: string | null = null): Promise<LeadNote> {
  const note: LeadNote = {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `note_${Date.now()}`,
    lead_id,
    author_email,
    content,
    follow_up_date,
    created_at: new Date().toISOString(),
  };

  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('lead_notes')
        .insert(note)
        .select()
        .single();
      if (!error && data) return data as LeadNote;
    } catch (err) {
      console.error('Failed to add lead note in Supabase:', err);
    }
  }

  localStore.leadNotes.push(note);
  return note;
}

export async function getLeadNotes(lead_id: string): Promise<LeadNote[]> {
  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('lead_notes')
        .select('*')
        .eq('lead_id', lead_id)
        .order('created_at', { ascending: false });
      if (!error && data) return data as LeadNote[];
    } catch (err) {
      console.error('Failed to fetch lead notes from Supabase:', err);
    }
  }
  return localStore.leadNotes.filter((n) => n.lead_id === lead_id);
}

export async function updateLeadNotificationStatus(id: string, updates: { notification_sent?: boolean; confirmation_sent?: boolean; notification_error?: string; confirmation_error?: string }) {
  if (supabaseAdmin) {
    try {
      await supabaseAdmin.from('leads').update(updates).eq('id', id);
    } catch (err) {
      console.error('Error updating notification status in Supabase:', err);
    }
  }
  const lead = localStore.leads.find((l) => l.id === id);
  if (lead) {
    Object.assign(lead, updates);
  }
}
