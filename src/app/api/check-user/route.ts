import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
    const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
        }

        const { data: users, error: userCheckError } = await supabaseAdmin.rpc('get_user_by_email', {
            email_param: email
        });

        if (userCheckError) {
            console.error("User check RPC error:", userCheckError);
            return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
        }

        const exists = users && users.length > 0;

        return NextResponse.json({
            exists: exists,
            message: exists ? 'User found' : 'User not found'
        });

    } catch (error) {
        console.error('Check user API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}