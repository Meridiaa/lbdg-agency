
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

function safeCompare(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  return (
    left.length === right.length &&
    crypto.timingSafeEqual(left, right)
  );
}

function addCorsHeaders(
  response: NextResponse,
  origin: string | null,
  allowedOrigin: string
) {
  if (origin === allowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', allowedOrigin);
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Vary', 'Origin');
  }

  return response;
}

export function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const origin = req.headers.get('origin');

  const allowedOrigin =
    process.env.FRONTEND_ORIGIN || 'https://lbdg-agency.vercel.app';

  const isApiRoute = pathname.startsWith('/api/');
  const isAdminPage = pathname.startsWith('/admin');
  const isAdminApi = pathname.startsWith('/api/admin');

  // Handle browser CORS preflight requests.
  if (isApiRoute && req.method === 'OPTIONS') {
    if (origin && origin !== allowedOrigin) {
      return NextResponse.json(
        { success: false, error: 'Origin not allowed' },
        { status: 403 }
      );
    }

    return addCorsHeaders(
      new NextResponse(null, { status: 204 }),
      origin,
      allowedOrigin
    );
  }

  // Reject requests from unapproved browser origins.
  if (isApiRoute && origin && origin !== allowedOrigin) {
    return NextResponse.json(
      { success: false, error: 'Origin not allowed' },
      { status: 403 }
    );
  }

  // Login must remain accessible without an existing session.
  if (
    pathname === '/admin/login' ||
    pathname === '/api/admin/login'
  ) {
    return addCorsHeaders(
      NextResponse.next(),
      origin,
      allowedOrigin
    );
  }

  // TEMPORARY authentication check.
  // This will be replaced with Supabase Auth in the next phase.
  if (isAdminPage || isAdminApi) {
    const secret = process.env.ADMIN_SESSION_SECRET;
    const token = req.cookies.get('lbdg_admin_token')?.value;

    const validConfiguration = Boolean(
      secret && secret.length >= 32
    );

    const authenticated = Boolean(
      validConfiguration &&
      token &&
      safeCompare(token, secret!)
    );

    if (isAdminPage && !authenticated) {
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('from', pathname);

      return NextResponse.redirect(loginUrl);
    }

    if (isAdminApi && !authenticated) {
      return addCorsHeaders(
        NextResponse.json(
          { success: false, error: 'Unauthorized' },
          { status: 401 }
        ),
        origin,
        allowedOrigin
      );
    }
  }

  return addCorsHeaders(
    NextResponse.next(),
    origin,
    allowedOrigin
  );
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/:path*',
  ],
};
