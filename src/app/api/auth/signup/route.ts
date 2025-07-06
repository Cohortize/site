import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import { Resend } from 'resend'
import { Redis } from '@upstash/redis'
const resend = new Resend(process.env.EMAIL_API_KEY!)
const redis = Redis.fromEnv()
import crypto from 'crypto'
const users: { email: string; password: string; verified: boolean }[] = []
const temporaryUsers: { email: string; password: string; otp: string; timestamp: number }[] = []

function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString()
}

async function sendOTPEmail(email: string, otp: string): Promise<{token: string}> {
    console.log(`Sending OTP to ${email}: ${otp}`)
    try {
        await resend.emails.send({
            from: 'noreply@cohortize.xyz',
            to: email,
            subject: 'Your OTP for Cohortize',
            html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Password Reset OTP</h2>
          <p>Your OTP for Cohortize account creation is:</p>
          <div style="background-color: #f5f5f5; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 2px; margin: 20px 0;">
            ${otp}
          </div>
          <p>This OTP will expire in 10 minutes.</p>
          <p>If you didn't request this password reset, please ignore this email.</p>
        </div>`
        }
    )
    console.log("email sent")
    const inputData= {
    'category': 'signup',
    'email': email,
    'otp' : otp
    }
    const token = crypto.randomUUID().toString()
    console.log(token)
    await redis.setex(token, 600, JSON.stringify(inputData))
    return {token}
    } catch (err) {
        console.error("Failed to send OTP email:", err)
        throw new Error("Failed to send OTP email")
    }

}

async function getUserByEmail(email: string) {
    return users.find(user => user.email === email) || null
}

async function storeTemporaryUser(userData: { email: string; password: string; otp: string }) {
    const existingIndex = temporaryUsers.findIndex(user => user.email === userData.email)
    if (existingIndex !== -1) {
        temporaryUsers.splice(existingIndex, 1)
    }

    temporaryUsers.push({
        ...userData,
        timestamp: Date.now()
    })

    const tenMinutesAgo = Date.now() - (10 * 60 * 1000)
    for (let i = temporaryUsers.length - 1; i >= 0; i--) {
        if (temporaryUsers[i].timestamp < tenMinutesAgo) {
            temporaryUsers.splice(i, 1)
        }
    }
}

function validateSignupInput(email: string, password: string): string | null {
    if (!email || !password) return 'Email and password are required'

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return 'Invalid email format'

    if (password.length < 8) return 'Password must be at least 8 characters long'

    return null
}

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json()

        const validationError = validateSignupInput(email, password)
        if (validationError) {
            return NextResponse.json({ error: validationError }, { status: 400 })
        }

        const existingUser = await getUserByEmail(email)
        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const otp = generateOTP()
        await storeTemporaryUser({ email, password: hashedPassword, otp })
        const tokenResponse = await sendOTPEmail(email, otp)
        return NextResponse.json({ 
            message: 'OTP sent successfully. Please check your email to verify your account.',
            token: tokenResponse.token,
            ...(process.env.NODE_ENV === 'development' && { developmentOTP: otp })
        })
        
    } catch (err) {
        console.error('Signup error:', err)
        return NextResponse.json({ error: 'Failed to process signup' }, { status: 500 })
    }
}
