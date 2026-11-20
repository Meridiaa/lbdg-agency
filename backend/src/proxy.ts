
import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

type SupabaseCookie = {
  name: string;
  value: string;
  options?: Record<string, unknown>;
};

function getAllowedOrigins(request: NextRequest): Set<string> {
  const origins = new Set<string>([
    request.nextUrl.origin,
  ]);

  const frontendOrigin = process.env.FRONTEND_ORIGIN;

  if (frontendOrigin) {
    try {
      origins.add(new URL(frontendOrigin).origin);
    } catch {
      console.error('Invalid FRONTEND_ORIGIN configuration.');
    }
  } else {
    origins.add('https://lbdg-agency.vercel.app');
  }

  return origins;
}

function addCorsHeaders(
  response: NextResponse,
  origin: string | null,
  allowedOrigins: Set<string>
): NextResponse {
  if (origin && allowedOrigins.has(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Credentials', 'true');

    response.headers.set(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );

    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    );

    response.headers.set('Vary', 'Origin');
  }

  return response;
}

function unauthorizedRedirect(request: NextRequest): NextResponse {
  const loginUrl = new URL('/admin/login', request.url);

  loginUrl.searchParams.set(
    'from',
    request.nextUrl.pathname
  );

  return NextResponse.redirect(loginUrl);
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const origin = request.headers.get('origin');

  const allowedOrigins = getAllowedOrigins(request);

  const normalizedPath = pathname.replace(/\/$/, '');

  const isApiRoute =
    pathname.startsWith('/api/');

  const isAdminPage =
    normalizedPath === '/admin' ||
    pathname.startsWith('/admin/');

  const isAdminLogin =
    normalizedPath === '/admin/login';

  const isAdminApi =
    normalizedPath === '/api/admin' ||
    pathname.startsWith('/api/admin/');

  const isPublicAdminEndpoint =
    normalizedPath === '/api/admin/login' ||
    normalizedPath === '/api/admin/logout';

  // Handle CORS preflight requests.
  if (isApiRoute && request.method === 'OPTIONS') {
    if (origin && !allowedOrigins.has(origin)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Origin not allowed',
        },
        { status: 403 }
      );
    }

    return addCorsHeaders(
      new NextResponse(null, { status: 204 }),
      origin,
      allowedOrigins
    );
  }

  // Reject requests from unapproved browser origins.
  if (isApiRoute && origin && !allowedOrigins.has(origin)) {
    return NextResponse.json(
      {
        success: false,
        error: 'Origin not allowed',
      },
      { status: 403 }
    );
  }

  // Login and logout endpoints do not require an existing session.
  if (isAdminApi && isPublicAdminEndpoint) {
    return addCorsHeaders(
      NextResponse.next(),
      origin,
      allowedOrigins
    );
  }

  // Admin API routes perform their own authorization.
  // Every protected route must call getAdminContext().
  if (isAdminApi) {
    return addCorsHeaders(
      NextResponse.next(),
      origin,
      allowedOrigins
    );
  }

  // Only admin pages need session verification here.
  if (!isAdminPage || isAdminLogin) {
    const response = NextResponse.next();

    if (isApiRoute) {
      return addCorsHeaders(
        response,
        origin,
        allowedOrigins
      );
    }

    return response;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase environment variables are missing.');

    return unauthorizedRedirect(request);
  }

  let response = NextResponse.next({
    request,
  });

  const refreshedCookies: SupabaseCookie[] = [];

  // Create a cookie-aware Supabase client.
  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            refreshedCookies.push({
              name,
              value,
              options,
            });

            request.cookies.set(name, value);

            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  try {
    // Validate and refresh the authenticated user session.
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return unauthorizedRedirectWithCookies(
        request,
        refreshedCookies
      );
    }

    // Verify that this user has an active administrator profile.
    const { data: profile, error: profileError } = await supabase
      .from('admin_profiles')
      .select('id, is_active')
      .eq('id', user.id)
      .maybeSingle();

    if (profileError || !profile || !profile.is_active) {
      await supabase.auth.signOut();

      return unauthorizedRedirectWithCookies(
        request,
        refreshedCookies
      );
    }

    return response;
  } catch (error) {
    console.error('Admin session verification failed:', error);

    return unauthorizedRedirectWithCookies(
      request,
      refreshedCookies
    );
  }
}

function unauthorizedRedirectWithCookies(
  request: NextRequest,
  cookiesToSet: SupabaseCookie[]
): NextResponse {
  const response = unauthorizedRedirect(request);

  cookiesToSet.forEach(({ name, value, options }) => {
    response.cookies.set(
      name,
      value,
      options as Parameters<typeof response.cookies.set>[2]
    );
  });

  return response;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/:path*',
  ],
};
