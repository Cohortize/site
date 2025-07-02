import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useState } from "react"
import { InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot
 } from "../ui/input-otp"

export function ForgotPassword({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [otpSent, setOtpSent] = useState(false)
  
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setOtpSent(true)
  }
  
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("OTP submitted")
  }
  
  const emailInput = () => {
    return(
      <form className={cn("flex flex-col gap-6", className)} onSubmit={handleEmailSubmit} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold text-[#b6b4b4]">forgor</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to reset your password
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="email" className="text-[#b6b4b4]">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" className="border border-white/20" required />
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
          <InputOTP maxLength={6}>
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
  
  return (
    otpSent ? otpInput() : emailInput()
  );
}