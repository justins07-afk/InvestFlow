import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

// Routes qui ne nécessitent pas d'authentification
const publicRoutes = ['/login', '/forgot-password', '/reset-password'];

export async function middleware(request: NextRequest) {
  // Initialiser le cookie store
  const cookieStore = cookies();
  
  // Créer un client Supabase pour le middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: any) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  // Vérifier si l'utilisateur est connecté
  const { data: { session } } = await supabase.auth.getSession();

  // URL actuelle
  const url = request.nextUrl.clone();
  const { pathname } = url;

  // Rediriger vers le login si l'utilisateur n'est pas connecté et essaie d'accéder à une route protégée
  if (!session && !publicRoutes.some(route => pathname.startsWith(route)) && pathname !== '/') {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Rediriger vers le dashboard si l'utilisateur est connecté et essaie d'accéder à une route publique
  if (session && (publicRoutes.some(route => pathname.startsWith(route)) || pathname === '/')) {
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  // Continuer avec la requête
  return NextResponse.next();
}

// Activer le middleware sur toutes les routes sauf les routes statiques et API
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
}; 