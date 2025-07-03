import { NextRequest, NextResponse } from "next/server";


const users: { id: string; email: string; password: string; verified: boolean; createdAt: Date }[] = []
const temporaryUsers: { email: string; password: string; otp: string; timestamp: number }[] = []

async function getTemporaryUser(email: string) {
    const tempUser = temporaryUsers.find(user => user.email === email)
    if (!tempUser) return null
    const tenMinutesAgo = Date.now() - (10 * 60 * 1000)
    if (tempUser.timestamp < tenMinutesAgo) {
        const index = temporaryUsers.findIndex(user => user.email === email)
        if (index !== -1) {
            temporaryUsers.splice(index, 1)
        }
        return null
    }
    
    return tempUser
}


async function createUser(userData: { email: string; password: string }) {
    const newUser = {
        id: Date.now().toString(),
        email: userData.email,
        password: userData.password,
        verified: true,
        createdAt: new Date()
    }
    
    users.push(newUser)
    return newUser
}


async function deleteTemporaryUser(email: string) {
    const index = temporaryUsers.findIndex(user => user.email === email)
    if (index !== -1) {
        temporaryUsers.splice(index, 1)
    }
}


function validateVerifyInput(email: string, otp: string): string | null {
    if (!email || !otp) {
        return 'Email and OTP are required'
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        return 'Invalid email format'
    }
    
    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
        return 'OTP must be 6 digits'
    }
    
    return null
}

export async function POST(req: NextRequest) {
    try {
        const { email, otp } = await req.json()
        

        const validationError = validateVerifyInput(email, otp)
        if (validationError) {
            return NextResponse.json({ error: validationError }, { status: 400 })
        }
        
 
        const tempUser = await getTemporaryUser(email)
        if (!tempUser) {
            return NextResponse.json({ 
                error: 'No pending verification found or OTP expired' 
            }, { status: 400 })
        }
        
      
        if (tempUser.otp !== otp) {
            return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 })
        }
        
  
        const newUser = await createUser({
            email: tempUser.email,
            password: tempUser.password
        })
        

        await deleteTemporaryUser(email)
        
        return NextResponse.json({ 
            message: 'Account created successfully',
            user: {
                id: newUser.id,
                email: newUser.email,
                verified: newUser.verified
            }
        })
        
    } catch (error) {
        console.error('OTP verification error:', error)
        return NextResponse.json({ error: 'Failed to verify OTP' }, { status: 500 })
    }
}

export { temporaryUsers, users }