// Comprehensive Automated Test Suite for LBDG Agency
const BASE_URL = 'http://localhost:3000';

async function runTests() {
  console.log('====================================================');
  console.log('   STARTING LBDG AGENCY AUTOMATED VERIFICATION SUITE');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, testName) {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName}`);
      failed++;
    }
  }

  // 1. PUBLIC ROUTES
  console.log('--- 1. Testing Public Routes ---');
  const routes = ['/', '/about', '/services', '/portfolio', '/contact', '/privacy-policy', '/robots.txt', '/sitemap.xml'];
  for (const route of routes) {
    try {
      const res = await fetch(`${BASE_URL}${route}`);
      assert(res.status === 200, `Route ${route} returned HTTP 200`);
      const text = await res.text();
      if (route === '/') {
        assert(text.includes('LBDG'), 'Home page contains LBDG branding');
        assert(text.includes('application/ld+json'), 'Home page contains Schema.org JSON-LD structured data');
        assert(res.headers.get('x-frame-options') === 'DENY', 'Production security header X-Frame-Options: DENY is active');
        assert(res.headers.get('x-content-type-options') === 'nosniff', 'Production security header X-Content-Type-Options: nosniff is active');
      }
      if (route === '/robots.txt') {
        assert(text.includes('Disallow: /admin/'), 'robots.txt protects /admin/');
      }
      if (route === '/sitemap.xml') {
        assert(text.includes('/services'), 'sitemap.xml lists services URL');
      }
    } catch (err) {
      assert(false, `Route ${route} threw exception: ${err.message}`);
    }
  }

  // 2. WHATSAPP & PHONE VERIFICATION
  console.log('\n--- 2. Testing WhatsApp & Click-to-Call ---');
  try {
    const homeHtml = await (await fetch(`${BASE_URL}/`)).text();
    assert(homeHtml.includes('wa.me/919693370336'), 'Home page includes official WhatsApp link wa.me/919693370336');
    assert(homeHtml.includes('tel:+919693370336'), 'Home page includes click-to-call link tel:+919693370336');
  } catch (err) {
    assert(false, `WhatsApp inspection error: ${err.message}`);
  }

  // 3. CONTACT FORM API & SERVER-SIDE VALIDATION
  console.log('\n--- 3. Testing Contact Form API & Validation ---');
  let createdLeadNumber = null;

  // 3a. Rejection on missing fields
  try {
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'A' }),
    });
    assert(res.status === 400, 'Rejects invalid payload with HTTP 400');
  } catch (err) {
    assert(false, `Validation error test threw: ${err.message}`);
  }

  // 3b. Anti-Spam Honeypot test
  try {
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Bot User',
        email: 'bot@example.com',
        service: 'Website Development',
        message: 'This is automated spam message.',
        consent: true,
        honeypot: 'filled_by_bot',
      }),
    });
    const data = await res.json();
    assert(data.lead_number === 'LBDG-PROCESSED', 'Honeypot trap silently deflects bot submission');
  } catch (err) {
    assert(false, `Honeypot test threw: ${err.message}`);
  }

  // 3c. Legitimate submission
  try {
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Siddharth Verma',
        email: 'siddharth@example.com',
        phone: '+91 9876543210',
        service: 'Website Development',
        budget: '₹75,000 – ₹1,50,000',
        message: 'We are redesigning our corporate web platform and require high-performance React architecture.',
        consent: true,
      }),
    });
    const data = await res.json();
    assert(res.status === 200 && data.success === true, 'Contact submission returns HTTP 200 with success: true');
    assert(Boolean(data.lead_number && data.lead_number.startsWith('LBDG-')), `Generated unique lead reference: ${data.lead_number}`);
    createdLeadNumber = data.lead_number;
  } catch (err) {
    assert(false, `Contact submission threw: ${err.message}`);
  }

  // 4. ADMIN SECURITY & AUTHORIZATION
  console.log('\n--- 4. Testing Admin Security & Authentication ---');
  let adminCookie = '';

  // 4a. Unauthorized access without cookie
  try {
    const pageRes = await fetch(`${BASE_URL}/admin/dashboard`, { redirect: 'manual' });
    assert(pageRes.status === 307 || pageRes.status === 302, 'Unauthenticated access to /admin/dashboard redirects to /admin/login (HTTP 307)');

    const res = await fetch(`${BASE_URL}/api/admin/leads`);
    assert(res.status === 401, 'Unauthorized request to /api/admin/leads correctly returns HTTP 401');
  } catch (err) {
    assert(false, `Auth check test threw: ${err.message}`);
  }

  // 4b. Invalid password
  try {
    const res = await fetch(`${BASE_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@lbdg.agency', password: 'WrongPassword123' }),
    });
    assert(res.status === 401, 'Invalid password correctly returns HTTP 401');
  } catch (err) {
    assert(false, `Bad password test threw: ${err.message}`);
  }

  // 4c. Valid login
  try {
    const res = await fetch(`${BASE_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@lbdg.agency', password: 'Abhinav@123' }),
    });
    assert(res.status === 200, 'Admin login with valid credentials returns HTTP 200');
    const setCookie = res.headers.get('set-cookie');
    assert(Boolean(setCookie && setCookie.includes('lbdg_admin_token')), 'Admin login sets secure lbdg_admin_token cookie');
    adminCookie = setCookie ? setCookie.split(';')[0] : '';
  } catch (err) {
    assert(false, `Admin login threw: ${err.message}`);
  }

  // 5. ADMIN LEAD MANAGEMENT OPERATIONS
  console.log('\n--- 5. Testing Admin Lead Pipeline Operations ---');
  let targetLeadId = null;

  try {
    const res = await fetch(`${BASE_URL}/api/admin/leads`, {
      headers: { Cookie: adminCookie },
    });
    const data = await res.json();
    assert(data.success && Array.isArray(data.leads), 'Authenticated admin can fetch leads list');
    const match = data.leads.find((l) => l.lead_number === createdLeadNumber);
    assert(Boolean(match), `Created lead #${createdLeadNumber} exists in database`);
    if (match) targetLeadId = match.id;
  } catch (err) {
    assert(false, `Fetch leads threw: ${err.message}`);
  }

  // 5b. Update Lead Status
  if (targetLeadId) {
    try {
      const res = await fetch(`${BASE_URL}/api/admin/leads`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Cookie: adminCookie },
        body: JSON.stringify({ id: targetLeadId, status: 'contacted' }),
      });
      const data = await res.json();
      assert(data.success === true, 'Admin can update lead status to "contacted"');
    } catch (err) {
      assert(false, `Update status threw: ${err.message}`);
    }

    // 5c. Add Internal Audit Note
    try {
      const res = await fetch(`${BASE_URL}/api/admin/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Cookie: adminCookie },
        body: JSON.stringify({
          lead_id: targetLeadId,
          content: 'Discussed project scope over discovery call. Sent NDA and initial wireframe brief.',
          follow_up_date: '2026-03-01',
          author_email: 'admin@lbdg.agency',
        }),
      });
      const data = await res.json();
      assert(data.success === true && data.note?.content.includes('NDA'), 'Admin can attach internal notes with follow-up date');
    } catch (err) {
      assert(false, `Add note threw: ${err.message}`);
    }
  }

  // 5d. Export CSV
  try {
    const res = await fetch(`${BASE_URL}/api/admin/leads?export=csv`, {
      headers: { Cookie: adminCookie },
    });
    assert(res.status === 200, 'Admin can download CSV export (HTTP 200)');
    const csv = await res.text();
    assert(csv.includes('Lead Number') && csv.includes(createdLeadNumber), 'Exported CSV contains header and lead records');
  } catch (err) {
    assert(false, `CSV export threw: ${err.message}`);
  }

  // 6. CMS OPERATIONS
  console.log('\n--- 6. Testing CMS Operations (Services) ---');
  let createdServiceId = null;
  try {
    const res = await fetch(`${BASE_URL}/api/admin/services`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Cookie: adminCookie },
      body: JSON.stringify({
        title: 'App Store Optimization',
        subtitle: 'ASO & Mobile Growth',
        short_description: 'Increase mobile app installs with keyword optimization.',
        full_description: 'Complete organic mobile growth suite.',
        deliverables: ['Keyword research', 'Icon testing'],
      }),
    });
    const data = await res.json();
    assert(data.success === true, 'Admin CMS can create new service');
    createdServiceId = data.service?.id;
  } catch (err) {
    assert(false, `CMS create threw: ${err.message}`);
  }

  if (createdServiceId) {
    try {
      const res = await fetch(`${BASE_URL}/api/admin/services?id=${createdServiceId}`, {
        method: 'DELETE',
        headers: { Cookie: adminCookie },
      });
      const data = await res.json();
      assert(data.success === true, 'Admin CMS can delete service');
    } catch (err) {
      assert(false, `CMS delete threw: ${err.message}`);
    }
  }

  console.log('\n====================================================');
  console.log(`   TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
