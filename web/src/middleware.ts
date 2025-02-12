import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const isLoginPage = request.nextUrl.pathname === '/admin/login'
  const isPartnerRoute = request.nextUrl.pathname.includes('/[entity]/')
  const isBusinessSignIn = request.nextUrl.pathname === '/login'

  // Get the maintenance and coming soon settings
  const isMaintenanceEnabled = false; // Replace with actual logic to get the setting
  const isComingSoonEnabled = false; // Replace with actual logic to get the setting

  // Skip redirects for maintenance and coming-soon pages themselves
  if (request.nextUrl.pathname === '/maintenance' ||
    request.nextUrl.pathname === '/coming-soon') {
    return NextResponse.next();
  }

  // If maintenance mode is enabled, handle redirects
  if (isMaintenanceEnabled) {
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

  // Regular auth checks (only if maintenance mode is not enabled)
  if (!isMaintenanceEnabled) {
    // Get auth status from cookie
    const isAuthenticated = request.cookies.get('qmaster-auth')?.value

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