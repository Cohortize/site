import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

interface UserData {
    category?: 'signup' | 'reset_password';
    email: string;
    otp: number;
}

interface OTPRequest {
    otp: number;
    token: string;
}

async function verifyOTP(token: string, otp: number) {
    try {
        const userData = await redis.get(token) as UserData | null;
        
        if (!userData) {
            return { success: false, message: "Invalid or expired token" };
        }

        if (Number(userData.otp) !== otp) {
            return { success: false, message: "Wrong OTP!" };
        }


        if (userData.category === "signup") {
            //database query will go here
            await redis.del(token);
            return { success: true, message: "Account created successfully" };
        } else if (userData.category === "reset_password") {
            //database query will go here
            await redis.del(token);
            return { success: true, message: "Password reset successfully" };
        } else {
            return { success: false, message: "Invalid category" };
        }
    } catch (error) {
        console.error('Redis error during OTP verification:', error);
        return { success: false, message: "Internal server error" };
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { otp, token }: OTPRequest = body;
        
    
        
        if (!otp || !token) {
            console.log('Missing fields - OTP:', !otp, 'Token:', !token);
            return NextResponse.json(
                { error: 'Missing required fields: otp and token' },
                { status: 400 }
            );
        }
        
        const otpNumber = typeof otp === 'string' ? parseInt(otp, 10) : otp;
        if (typeof otpNumber !== 'number' || isNaN(otpNumber) || otpNumber < 100000 || otpNumber > 999999) {
            console.log('Invalid OTP format - Value:', otpNumber, 'Type:', typeof otpNumber);
            return NextResponse.json(
                { error: 'Invalid OTP format' },
                { status: 400 }
            );
        }
        
        const result = await verifyOTP(token, otpNumber);

        if (result.success) {
            return NextResponse.json(
                { message: result.message },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { error: result.message },
                { status: 400 }
            );
        }

    } catch (error) {
        console.error('OTP verification error:', error);
        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { error: 'Invalid JSON in request body' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}