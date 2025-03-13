import axios from 'axios';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const isLoginPage = request.nextUrl.pathname === '/admin/login'
  const isExactAdminPath = request.nextUrl.pathname === '/admin'
  const isPartnerRoute = request.nextUrl.pathname.includes('/[entity]/')
  const isBusinessSignIn = request.nextUrl.pathname === '/login'

  // Get the maintenance and coming soon settings
  const url = process.env.NEXT_PUBLIC_API_BASE_URL! + process.env.NEXT_PUBLIC_API_BASE_URL_SETTINGS!;
  let response;
  try {
    response = await axios.get(url);
  } catch (error) {
    // Error while fetching settings, redirect to maintenance
    return NextResponse.redirect(new URL('/not-found', request.url));
  }
  const {
    isMaintenanceMode: isMaintenanceEnabled,
    isComingSoonMode: isComingSoonEnabled,
    maintenanceScheduledTime
  } = response.data;

  // Check if maintenance is currently active (scheduled time has passed)
  const isMaintenanceActive = isMaintenanceEnabled &&
    maintenanceScheduledTime &&
    new Date(maintenanceScheduledTime) <= new Date();

  // if maintenance or coming soon is not enabled but attempting to open them, handle redirects
  if ((request.nextUrl.pathname === '/maintenance' && !isMaintenanceActive) ||
    (request.nextUrl.pathname === '/coming-soon' && !isComingSoonEnabled)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If maintenance mode is active (scheduled time has passed), handle redirects
  if (isMaintenanceActive) {
    // If trying to access partner routes or business sign-in, redirect to maintenance
    if (isPartnerRoute || isBusinessSignIn) {
      // Clear the auth cookie if it exists
      const response = NextResponse.redirect(new URL('/maintenance', request.url));
      if (request.cookies.get('qmaster-auth')) {
        response.cookies.delete('qmaster-auth');
      }
      return response;
    }

    // For the landing page
    if (request.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/maintenance', request.url));
    }
  }

  // Regular auth checks (only if maintenance mode is not active)
  if (!isMaintenanceActive) {
    // Get auth status from cookie
    const isAuthenticated = request.cookies.get('qmaster-auth')?.value

    // Handle exact '/admin' path
    if (isExactAdminPath) {
      if (isAuthenticated) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      } else {
        const loginUrl = new URL('/admin/login', request.url);
        loginUrl.searchParams.set('from', '/admin');
        return NextResponse.redirect(loginUrl);
      }
    }

    // If trying to access admin routes (except login) without auth
    if (isAdminRoute && !isAuthenticated && !isLoginPage) {
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('from', request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }

    // If authenticated user tries to access login page
    if (isLoginPage && isAuthenticated) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }

    // Coming soon only affects the landing page
    if (isComingSoonEnabled && request.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/coming-soon', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/',
    '/maintenance',
    '/coming-soon',
    '/login',
    '/:entity/:path*' // Add this to catch all partner routes
  ]
}; 