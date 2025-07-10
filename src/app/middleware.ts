
import { createServerClient } from "@supabase/ssr";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    if (pathname.startsWith('/dashboard') || 
        pathname.startsWith('/profile') || 
        pathname.startsWith('/settings')) {
        const nextAuthToken = await getToken({ req: request });
        
        if (!nextAuthToken) {
            let supabaseResponse = NextResponse.next({
                request: {
                    headers: request.headers,
                },
            });
            
            const supabase = createServerClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                {
                    cookies: {
                        getAll() {
                            return request.cookies.getAll();
                        },
                        setAll(cookiesToSet) {
                            cookiesToSet.forEach(({ name, value, options }) => {
                                supabaseResponse.cookies.set(name, value, options);
                            });
                        },
                    },
                }
            );
            
            const { data: { session } } = await supabase.auth.getSession();
            
            if (!session) {
                return NextResponse.redirect(new URL('/login', request.url));
            }
            
            return supabaseResponse;
        }
    }
    
    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/profile/:path*', '/settings/:path*']
};