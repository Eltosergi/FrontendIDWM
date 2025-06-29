import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const role = token?.role;

  // 🚫 Si el admin intenta entrar a /dashboard → redirigir con toast
  if (pathname.startsWith('/dashboard') && role === 'Admin') {
    const redirectUrl = new URL('/admin', req.url);
    redirectUrl.searchParams.set('denied', 'true'); // para mostrar toast en /admin
    return NextResponse.redirect(redirectUrl);
  }

  if (pathname.startsWith('/basket') && role === 'Admin') {
    const redirectUrl = new URL('/admin', req.url);
    redirectUrl.searchParams.set('denied', 'true'); // para mostrar toast en /admin
    return NextResponse.redirect(redirectUrl);
  }

  // ✅ Libre acceso a /dashboard si no es admin
  if (pathname.startsWith('/dashboard')) {
    return NextResponse.next();
  }

  // 🔐 Rutas protegidas
  const protectedRoutes = ['/basket', '/admin'];
  const isProtected = protectedRoutes.some((path) => pathname.startsWith(path));

  if (isProtected && !token) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('callbackUrl', req.url);
    return NextResponse.redirect(loginUrl);
  }

  // 🔒 Acceso restringido solo a Admin
  if (pathname.startsWith('/admin') && role !== 'Admin') {
    const redirectUrl = new URL('/dashboard', req.url);
    redirectUrl.searchParams.set('denied', 'true');
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/basket/:path*', '/admin/:path*'],
};
