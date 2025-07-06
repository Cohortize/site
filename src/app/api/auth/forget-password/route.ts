import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { Redis } from "@upstash/redis";

const resend = new Resend(process.env.EMAIL_API_KEY);
const redis = Redis.fromEnv();

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOtpEmail(email: string, otp: string): Promise<{token: string}> {
  console.log("sending password reset email");
  try {
    await resend.emails.send({
      from: "noreply@cohortize.xyz",
      to: email,
      subject: "OTP for Password Reset",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Password Reset OTP</h2>
          <p>Your OTP for Cohortize password reset is:</p>
          <div style="background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 2px; margin: 20px 0;">
            ${otp}
          </div>
          <p>This OTP will expire in 10 minutes.</p>
          <p>If you didn't request this password reset, please ignore this email.</p>
        </div>
      `
    });

    console.log("email sent successfully");
    
    const userInput = {
      'category': 'reset_password',
      'email': email,
      'otp': otp
    };
    
    const token = crypto.randomUUID().toString();
    await redis.setex(token, 600, JSON.stringify(userInput));

    return { token };
    
  } catch (err) {
    console.log("failed to send otp", err);
    throw new Error("Failed to send OTP");
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const otp = generateOTP();
    
    const { token } = await sendOtpEmail(email, otp);

    return NextResponse.json(
      { 
        message: "OTP sent successfully",
        token: token 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error in forget-password API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}