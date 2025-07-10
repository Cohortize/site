
import { getServerSession } from "next-auth";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Session } from "next-auth";
import { Session as SupabaseSession } from "@supabase/supabase-js";

interface UnifiedSessionResult {
  type: 'oauth' | 'email';
  session: Session | SupabaseSession;
  user: any;
}

export async function unifiedSession(): Promise<UnifiedSessionResult | null> {
    const nextAuthSession = await getServerSession();
    if (nextAuthSession) {
        return {
            type: 'oauth', 
            session: nextAuthSession, 
            user: nextAuthSession.user
        };
    }

    const cookieStore = await cookies();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll();
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) => {
                            cookieStore.set(name, value, options);
                        });
                    } catch (error) {
                    }
                }
            }
        }
    );

    const { data: { session: supabaseSession } } = await supabase.auth.getSession();

    if (supabaseSession) {
        return {
            type: 'email',
            session: supabaseSession,
            user: supabaseSession.user
        };
    }

    return null;
}