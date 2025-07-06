import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.EMAIL_API_KEY)

// Generate a random 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOtpEmail(email: string, otp: string) {
  console.log("sending password reset email")
  try {
    await resend.emails.send({
      from: "noreply@cohortize.xyz", // Make sure this domain is verified in Resend
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
    })
    console.log("email sent successfully")
  } catch (err) {
    console.log("failed to send otp", err)
    throw new Error("Failed to send OTP")
  }
}

// Store OTPs temporarily (in production, use Redis or database)
const otpStore = new Map<string, { otp: string; expires: number }>();

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

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Generate OTP
    const otp = generateOTP();
    
    // Store OTP with expiration (10 minutes)
    const expires = Date.now() + 10 * 60 * 1000; // 10 minutes from now
    otpStore.set(email, { otp, expires });

    // Send OTP email
    await sendOtpEmail(email, otp);

    return NextResponse.json(
      { message: "OTP sent successfully" },
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

// Optional: Add a method to verify OTP
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, otp } = body;

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      );
    }

    const storedData = otpStore.get(email);
    
    if (!storedData) {
      return NextResponse.json(
        { error: "OTP not found or expired" },
        { status: 400 }
      );
    }

    if (Date.now() > storedData.expires) {
      otpStore.delete(email);
      return NextResponse.json(
        { error: "OTP has expired" },
        { status: 400 }
      );
    }

    if (storedData.otp !== otp) {
      return NextResponse.json(
        { error: "Invalid OTP" },
        { status: 400 }
      );
    }

    // OTP is valid, remove it from store
    otpStore.delete(email);

    return NextResponse.json(
      { message: "OTP verified successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error in OTP verification:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}