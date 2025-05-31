import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes qui ne nécessitent pas d'authentification
const publicRoutes = ['/login', '/forgot-password', '/reset-password'];

export async function middleware(request: NextRequest) {
  // URL actuelle
  const url = request.nextUrl.clone();
  const { pathname } = url;

  // Pour le développement, on laisse passer toutes les requêtes
  return NextResponse.next();
}

// Activer le middleware sur toutes les routes sauf les routes statiques et API
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
}; 