# LBDG Agency - Backend Integration & API Reference Guide

Welcome to the backend integration package for the LBDG Agency platform. This package contains the complete server-side architecture, including API endpoints, database schemas, email automation pipelines, security middleware, and TypeScript definitions.

---

## 📁 Package Directory Structure

```text
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── contact/route.ts              # Public contact & lead acquisition API
│   │   │   └── admin/
│   │   │       ├── login/route.ts            # Admin authentication & session handler
│   │   │       ├── logout/route.ts           # Admin session destruction handler
│   │   │       ├── leads/route.ts            # Lead pipeline CRM (GET, PATCH, CSV export)
│   │   │       ├── services/route.ts         # Services CMS CRUD API
│   │   │       ├── portfolio/route.ts        # Portfolio Case Studies CMS CRUD API
│   │   │       ├── testimonials/route.ts     # Client Testimonials CMS CRUD API
│   │   │       └── settings/route.ts         # Agency Global Settings API
│   │   ├── robots.ts                         # Dynamic robots.txt metadata route
│   │   └── sitemap.ts                        # Dynamic XML sitemap generator
│   ├── lib/
│   │   ├── adminAuth.ts                      # Constant-time token verification & cookie helpers
│   │   ├── constants.ts                      # Official contact details & fallback seeds
│   │   ├── rateLimit.ts                      # In-memory sliding-window rate limiter
│   │   ├── resend.ts                         # Resend transactional email automation
│   │   ├── supabase.ts                       # Public/browser Supabase client
│   │   ├── supabaseAdmin.ts                  # Service-role Supabase client + local fallback
│   │   └── types.ts                          # Shared TypeScript interfaces & types
│   └── middleware.ts                         # Route protection & admin token security middleware
├── supabase/
│   └── migrations/
│       └── 20260218_initial_schema.sql       # Full PostgreSQL database schema & RLS policies
├── .env.example                              # Environment configuration template
├── package.json                              # Project dependencies specification
├── tsconfig.json                             # TypeScript path mapping configuration
├── run-tests.mjs                             # Automated verification test suite
└── BACKEND_INTEGRATION_GUIDE.md              # This guide
```

---

## 🛠️ Step 1: Environment Configuration

Create a `.env.local` file in your project root using `.env.example` as a template:

```env
# 1. Site Deployment URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# 2. Supabase Database & Auth
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# 3. Resend Transactional Email Automation
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=LBDG Agency <onboarding@resend.dev>
AGENCY_NOTIFICATION_EMAIL=your-inbox@example.com

# 4. Admin Security
ADMIN_EMAIL=admin@lbdg.agency
ADMIN_PASSWORD=YourStrongPasswordHere
ADMIN_SESSION_SECRET=your_random_32_character_secret_string
```

> **Note on Local Prototyping:**
> If Supabase credentials are not supplied, `src/lib/supabaseAdmin.ts` automatically switches to an in-memory storage fallback. This allows local development and endpoint testing even without active database credentials!

---

## 🗄️ Step 2: Database Migration (Supabase PostgreSQL)

1. Open your project on [Supabase](https://supabase.com/).
2. Navigate to the **SQL Editor**.
3. Open `supabase/migrations/20260218_initial_schema.sql`.
4. Run the SQL script to create all required tables:
   - `public.admin_profiles`: Admin user accounts
   - `public.leads`: Customer lead acquisitions with tracking references (e.g. `LBDG-2026-XXXX`)
   - `public.lead_notes`: Follow-ups and CRM internal notes
   - `public.services`: Agency service catalog items
   - `public.portfolio_projects`: Case studies and deliverables
   - `public.testimonials`: Client ratings and reviews
   - `public.agency_settings`: Contact metadata, operating hours, and tracking IDs
5. Row Level Security (RLS) is automatically enabled with safe policies.

---

## 📡 Step 3: API Endpoint Catalog & Specifications

### 1. Lead Acquisition (`POST /api/contact`)
Handles public inquiries with rate limiting, spam bot honeypot detection, database persistence, and dual transactional email notifications.

- **Rate Limit**: 15 requests per minute per IP address.
- **Max Payload**: 64 KB.
- **Request Body (JSON)**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "+1 555-0199",
    "service": "Digital Marketing",
    "budget": "$5k - $10k",
    "message": "We need help scaling our digital presence.",
    "consent": true,
    "honeypot": ""
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "lead_number": "LBDG-2026-92815432",
    "message": "Your inquiry has been successfully received.",
    "notification_sent": true
  }
  ```

---

### 2. Admin Authentication (`POST /api/admin/login` & `/api/admin/logout`)

- **Login Request Body**:
  ```json
  {
    "email": "admin@lbdg.agency",
    "password": "YourStrongPasswordHere"
  }
  ```
- **Response**: Sets an `httpOnly`, `SameSite=Lax` cookie named `lbdg_admin_token`.
- **API Token Alternative**: You may also pass `Authorization: Bearer <ADMIN_SESSION_SECRET>` in the header for automated/headless API requests.

---

### 3. Lead Management & Export (`/api/admin/leads`)

- **GET `/api/admin/leads`**: Fetch leads with status filtering and pagination.
  - Query parameters: `status=new|contacted|in_progress|converted|closed`, `search=query`, `page=1`
- **GET `/api/admin/leads?export=csv`**: Downloads lead pipeline records formatted as a UTF-8 CSV file.
- **PATCH `/api/admin/leads`**: Update lead status or add an internal note.
  ```json
  {
    "leadId": "lead-uuid",
    "status": "contacted",
    "note": "Called client, scheduled demo for Thursday.",
    "followUpDate": "2026-11-25"
  }
  ```

---

### 4. CMS Endpoints (`/api/admin/services`, `/api/admin/portfolio`, `/api/admin/testimonials`, `/api/admin/settings`)
Full CRUD endpoints allowing you to query, create, update, or remove service offerings, case studies, reviews, and agency contact settings.

---

## 🔒 Security & Middleware

- **`src/middleware.ts`**: Automatically guards `/admin/:path*` and `/api/admin/:path*`.
- **Constant-Time Comparison**: Protects against timing attacks during session validation.
- **Bot Defense**: Silent honeypot trap to deflect automated spam bots without server strain.
- **Input Sanitization**: Strict Zod schema validation on all inputs.

---

## 🧪 Verification & Testing

An automated verification test script (`run-tests.mjs`) is included. You can test your backend by running:

```bash
# Start your local server
npm run dev

# In another terminal, run the test suite
node run-tests.mjs
```