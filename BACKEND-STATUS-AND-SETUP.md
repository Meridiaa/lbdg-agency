# LBDG Agency revised project: integration and safety notes

## What this package changes

- Corrects the Contact page so it can POST to a separately deployed backend when `VITE_API_BASE_URL` is configured.
- Keeps an honest `mailto:` fallback when no backend URL is configured.
- Adds consent and honeypot fields to the contact form.
- Makes the office address a Google Maps search link.
- Corrects SEO metadata, canonical URLs, LocalBusiness/ProfessionalService JSON-LD and Search Console token support.
- Corrects GA4 script initialization and SPA page-view tracking.
- Adds root `.gitignore` and `.env.example`.
- Corrects backend contact constants to the supplied official phone, email, address and working hours.
- Removes seeded testimonials that were not substantiated by the supplied information.
- Makes lead creation fail closed if Supabase is unavailable instead of silently storing the lead in process memory.
- Makes missing Resend configuration report email failure rather than pretending emails were sent.
- Removes hardcoded fallback admin password/session secret behavior.

## Important: backend is still not production-ready

This archive is a remediation pass, not a security certification or a complete backend rewrite. The backend remains a separate Next.js application and is not automatically deployed with the Vite frontend.

The current backend still has legacy CMS routes that use in-memory stores for services, portfolio, testimonials and settings. Those routes must be migrated to persistent Supabase operations before they are used. The current static-secret admin session approach is transitional and must be replaced by Supabase Auth SSR sessions before exposing an admin interface. Do not enable or advertise the admin API as production-ready.

The supplied SQL migration also needs a security review before applying it to a live database. In particular, review public INSERT policies, admin helper functions, privileges, search_path and service-role usage. Do not apply a migration to a production project without a separate backup and review.

## Frontend setup

1. Back up your existing project folder.
2. Copy the contents of this package's `src/`, `public/`, `index.html`, `.gitignore` and `.env.example` into the existing Vite project, reviewing conflicts.
3. Keep your existing `.git/`, `.env.local`, `node_modules/` and `dist/`.
4. Run `npm install`, `npm run build`, and `npm run lint`.
5. Do not commit `.env.local`.

Create `.env.local` in the Vite project root:

```env
VITE_GA_MEASUREMENT_ID=
VITE_GOOGLE_SITE_VERIFICATION=
VITE_API_BASE_URL=
```

Leave `VITE_API_BASE_URL` blank until the backend is deployed and its CORS/origin setup has been tested. With it blank, the contact form opens an email draft and explicitly tells the visitor they must press Send.

## Backend setup

The backend is a separate Next.js app in `backend/`.

1. Deploy it as a separate Vercel project with `backend/` as the Root Directory, or deliberately migrate its API routes to another backend platform.
2. Create a Supabase project owned by LBDG.
3. Configure the environment variables from `backend/.env.example` in the backend deployment.
4. Use the Supabase service-role key only in server-side environment variables. Never use a `NEXT_PUBLIC_` prefix for it.
5. Verify the sender domain in Resend and configure `RESEND_FROM_EMAIL`. The Resend onboarding sender is not a permanent production sender.
6. Configure `FRONTEND_ORIGIN=https://lbdg-agency.vercel.app`.
7. Test database persistence and email delivery with test data before enabling the contact form.
8. Only after the backend is deployed and tested, set `VITE_API_BASE_URL` in the frontend Vercel project to the backend origin and redeploy.

### Critical limitation

The current backend's other CMS functions and legacy admin authentication are not a complete secure admin platform. Keep admin routes disabled/unpublished until Supabase Auth SSR, database-backed CMS CRUD, schema validation, distributed rate limiting, audit logging and backup/restore tests are implemented.

## Google setup

- Analytics ID and Search Console verification token must come from the agency-owned Google properties.
- Set `VITE_GA_MEASUREMENT_ID` and `VITE_GOOGLE_SITE_VERIFICATION` in Vercel frontend environment variables.
- Redeploy after setting environment variables.
- Verify the Search Console HTML tag on the live homepage and submit `/sitemap.xml`.
- The Google Business Profile must be an existing, agency-owned, verified listing. Do not invent its URL.

## Commit

After reviewing `git status` and ensuring `.env.local`, `node_modules`, `dist` and secrets are not staged:

```bash
git add src public index.html .gitignore .env.example
git commit -m "Improve LBDG frontend, contact flow and SEO"
git push origin main
```

Backend changes should be committed separately from the frontend if you decide to retain the backend prototype:

```bash
git add backend
git commit -m "Harden backend prototype and correct agency configuration"
git push origin main
```

Do not push real environment files, credentials, service-role keys, customer data or database exports.
