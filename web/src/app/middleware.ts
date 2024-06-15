import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import {
  privateRoutes,
  authRoutes,
  DEFAULT_REDIRECT_LOGIN_URL,
  DEFAULT_REDIRECT_HOME_URL
} from '@/app/routes';

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const route = req.nextUrl.pathname;

  const token = await getToken({
    req,
    salt: '',
    secret: ''
  });
  const isLoggedIn = !!token;

  if (authRoutes.some(authRoute => route.startsWith(authRoute))) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_REDIRECT_HOME_URL, url));
    }
    return NextResponse.next();
  }

  if (privateRoutes.includes(route)) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_REDIRECT_LOGIN_URL, url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
