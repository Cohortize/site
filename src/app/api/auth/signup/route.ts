import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'

const users: { email: string; password: string; verified: boolean }[] = []
const temporaryUsers: { email: string; password: string; otp: string; timestamp: number }[] = []

function generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString()
}

async function sendOTPEmail(email: string, otp: string): Promise<void> {
    console.log(`Sending OTP to ${email}: ${otp}`)
    await new Promise(resolve => setTimeout(resolve, 1000)) //dummy request
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
    if (!email || !password) {
        return 'Email and password are required'
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        return 'Invalid email format'
    }
    
    if (password.length < 8) {
        return 'Password must be at least 8 characters long'
    }
    
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
        await sendOTPEmail(email, otp)
        
        return NextResponse.json({ 
            message: 'OTP sent successfully. Please check your email to verify your account.',
            ...(process.env.NODE_ENV === 'development' && { developmentOTP: otp })
        })
        
    } catch (error) {
        console.error('Signup error:', error)
        return NextResponse.json({ error: 'Failed to process signup' }, { status: 500 })
    }
}