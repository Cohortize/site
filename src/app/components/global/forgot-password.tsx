import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import React, { useState } from "react"
import { InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
 } from "../ui/input-otp"
 import { toast } from 'sonner'
import { useAuth } from "@/app/context/AuthContext"
async function verifyOtp(token: string, otp: number) {
  const res = await fetch("/api/auth/verify-otp", {
    method: 'POST',
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify({ token, otp })
  })
  
  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.error || "failed to verify OTP")
  }
  
  return res.json()
}

async function sendOtpEmail(email: string) {
  const res = await fetch('/api/auth/forget-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.error || 'Failed to send OTP')
  }

  return await res.json()
}

export function ForgotPassword({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [otpSent, setOtpSent] = useState("emailNotEntered")
  const [otpToken, setOtpToken] = useState("")
  const [otpValue, setOtpValue] = useState<string>("")
  const {updatePassword} = useAuth()
  const [emailForgetPassword, setEmail] = useState("")
  
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formdata = new FormData(e.currentTarget as HTMLFormElement)
    const email = formdata.get('email') as string
    setEmail(email)
    try {
      const sendEmail = await sendOtpEmail(email)
      setOtpSent("otpSent")
      console.log(sendEmail.token)
      setOtpToken(sendEmail.token)
      toast("Email has been sent!", {
        description: "An e-mail with the OTP has been sent to your e-mail address."
      })
    } catch (error) {
      toast("Failed to send OTP", {
        description: error instanceof Error ? error.message : "Please try again later"
      })
    }
  }
  
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const otpNumber = Number(otpValue)
    
    try {
      const result = await verifyOtp(otpToken, otpNumber)
      setOtpSent("otpGot")
      toast("OTP verified successfully!", {
        description: "You can now reset your password."
      })
    } catch (error) {
      toast("Failed to verify OTP", {
        description: error instanceof Error ? error.message : "Please try again"
      })
    }
  }

  const handlePasswordSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const password = formData.get('password') as string
    const confirmPassword = formData.get('conPassword') as string
    
    // Password validation checks
    if (password.length < 8) {
      toast.error("Password too short", {
        description: "Password must be at least 8 characters long"
      })
      return
    }
    
    if (password !== confirmPassword) {
      toast.error("Passwords don't match", {
        description: "Please make sure both passwords are identical"
      })
      return
    }
    
    console.log(password)
    console.log(emailForgetPassword) 
    try{
      console.log("calling password update")
      const response = await updatePassword(emailForgetPassword, password)
      console.log("password update response", response)
      if(!response.success){
        toast.error('Password update failed', {
          description: response.message || 'An error occurred while updating your password'
        })
        return
      }
      toast.success("Password reset successful!", {
        description: "Your password has been updated successfully"
      })
      return 
    }
    catch(err){
      console.log('password update error occurred ', err)
      toast.error('Password update failed', {
        description: 'An unexpected error occurred. Please try again.'
      })
      return
    }
  }
  
  const emailInput = () => {
    return(
      <form className={cn("flex flex-col gap-6", className)} onSubmit={handleEmailSubmit} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold text-[#b6b4b4]">Forgot your password?</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to reset your password
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="email" className="text-[#b6b4b4]">Email</Label>
            <Input 
              id="email" 
              name="email"
              type="email" 
              placeholder="manan@cohortize.xyz" 
              className="border border-white/20" 
              required 
            />
          </div>
          <Button type="submit" className="w-full bg-[rgb(44,44,44)] hover:bg-[rgb(48,48,48)] cursor-pointer">
            Send OTP
          </Button>
        </div>
      </form>
    );
  }
  
  const otpInput = () => {
    return(
      <form className={cn("flex flex-col gap-6", className)} onSubmit={handleOtpSubmit} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold text-[#b6b4b4]">Enter OTP</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter the 6-digit code sent to your email
          </p>
        </div>
        <div className="grid gap-6 justify-center">
          <InputOTP maxLength={6} inputMode="numeric" pattern="\d+" value={otpValue} onChange={(value) => setOtpValue(value)}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1}/>
              <InputOTPSlot index={2}/>
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3}/>
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5}/>
            </InputOTPGroup>
          </InputOTP>
          <Button type="submit" className="w-full bg-[rgb(44,44,44)] hover:bg-[rgb(48,48,48)] cursor-pointer">
            Submit OTP
          </Button>
        </div>
      </form>
    );
  }
  
  const ResetPassword = () => {
    return(
          <form className={cn("flex flex-col gap-6", className)} {...props} 
          onSubmit={handlePasswordSubmit}
          >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-[#b6b4b4]">Enter new password</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter new password for your account (minimum 8 characters)
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="password" className="text-[#b6b4b4]">Password</Label>
          <Input 
            id="password" 
            name="password" 
            type="password" 
            className="border border-white/20" 
            minLength={8}
            required 
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="conPassword" className="text-[#b6b4b4]">Confirm Password</Label>
          </div>
          <Input 
            id="conPassword" 
            name="conPassword"
            type="password" 
            className="border border-white/20" 
            minLength={8}
            required 
          />
        </div>
        <Button type="submit" className="w-full bg-[rgb(44,44,44)] hover:bg-[rgb(48,48,48)] cursor-pointer">
          Change Password
        </Button>
      </div>
    </form>
    )
  }
  
  switch(otpSent){
    case "emailNotEntered":
      return emailInput()
    case "otpSent":
      return otpInput()
    case "otpGot":
      return ResetPassword()
  }
}