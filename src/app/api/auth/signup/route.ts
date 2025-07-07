import { NextRequest, NextResponse } from "next/server";
import { Resend } from 'resend'
import { Redis } from '@upstash/redis'
import { createClient } from "@supabase/supabase-js";
import crypto from 'crypto'

const resend = new Resend(process.env.EMAIL_API_KEY!)
const redis = Redis.fromEnv()

function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString()
}

async function sendOTPEmail(email: string, otp: string, password: string): Promise<{token: string}> {
    console.log(`Attempting to send OTP to ${email}: ${otp}`);
    try {
        await resend.emails.send({
            from: 'noreply@cohortize.xyz',
            to: email,
            subject: 'Your OTP for Cohortize',
            html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Account Creation OTP</h2>
          <p>Your OTP for Cohortize account creation is:</p>
          <div style="background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 2px; margin: 20px 0;">
            ${otp}
          </div>
          <p>This OTP will expire in 10 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>`
        });
        console.log("OTP email sent successfully.");

        const inputData = {
            'category': 'signup',
            'email': email,
            'password': password,
            'otp': otp
        };
        const token = crypto.randomUUID().toString();
        await redis.setex(token, 600, JSON.stringify(inputData));
        console.log(`Data stored in Redis with token: ${token}`);
        return { token };
    } catch (err) {
        console.error("Failed to send OTP email or store in Redis:", err);
        throw new Error("Failed to send OTP email.");
    }
}

function validateSignupInput(email: string, password: string): string | null {
    if (!email || !password) return 'Email and password are required.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Invalid email format.';
    if (password.length < 8) return 'Password must be at least 8 characters long.';
    return null;
}

export async function POST(req: NextRequest) {
    const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    try {
        const { email, password } = await req.json();

        const validationError = validateSignupInput(email, password);
        if (validationError) {
            return NextResponse.json({ error: validationError }, { status: 400 });
        }
        const { data: users, error: userCheckError } = await supabaseAdmin.rpc('get_user_by_email', {
            email_param: email
        });

        if (userCheckError) {
            console.error("User check RPC error:", userCheckError);
            return NextResponse.json({ error: 'An internal error occurred during user verification.' }, { status: 500 });
        }

        if (users && users.length > 0) {
            console.log(`Signup attempt for existing user: ${email}`);
            return NextResponse.json(
                { error: 'This email is already registered. Please log in instead.' },
                { status: 409 }
            );
        }

        const otp = generateOTP();
        const tokenResponse = await sendOTPEmail(email, otp, password);

        return NextResponse.json({
            message: 'OTP sent successfully. Please check your email to verify your account.',
            token: tokenResponse.token,
            ...(process.env.NODE_ENV === 'development' && { developmentOTP: otp })
        });

    } catch (err) {
        console.error('API Signup Endpoint Error:', err);
        return NextResponse.json({ error: 'Failed to process signup. Please try again later.' }, { status: 500 });
    }
}
