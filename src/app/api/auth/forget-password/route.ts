//import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
const resend = new Resend(localStorage.env.EMAIL_API_KEY)

async function sendOtpEmail(email:string, otp: string) {
    console.log("sending password reset email")
    try{
        await resend.emails.send({
            from: "otp.cohortize.xyz",
            to: email,
            subject: "otp for password reset",
            html: `<p>Yout otp for cohortize passord reset is <strong>${otp}</strong></p>`
        })
        console.log("email sent")
    }
    catch(err){
        console.log("failed to send otp", err)
        throw new Error("failed to send OTP")
    }
}