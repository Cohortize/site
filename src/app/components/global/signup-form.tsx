"use client"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useState } from "react"
import { toast } from "sonner"
import { signIn } from "next-auth/react"
import { InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
 } from "../ui/input-otp"
import { useRouter } from "next/navigation"
import { UserAuth } from "@/app/context/AuthContext"

async function sendOtpEmail(email: string, password: string) {
  const res = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.error || 'Failed to send OTP')
  }

  return await res.json()
}

async function verifyOtp(token: string, otp: number) {
  const res = await fetch('/api/auth/verify-otp',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({token, otp})
  })
  if(!res.ok){
    const errorData = await res.json()
    throw new Error(errorData.error || 'OTP not verified')
  }
  return await res.json()
}

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [otpSent, setOtpSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [otpToken, setOtpToken] = useState<string | null>(null)
  const [otpValue, setOtpValue] = useState("")
  const router = useRouter()
  const { session, signUpNewUser,
  //  checkUserExists 
  } = UserAuth()

  const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long")
      setIsLoading(false)
      return
    }
    
    try {
      const sendEmail = await sendOtpEmail(email, password)
      setOtpToken(sendEmail.token)
      console.log(sendEmail.token)
      toast("Email has been sent!", {
        description: "An e-mail with the OTP has been sent to your e-mail address."
      })
      setOtpSent(true)
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.")
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      if (!otpToken) {
        throw new Error("OTP token is missing")
      }
      
      const otpNumber = Number(otpValue)
      
      const response = await verifyOtp(otpToken, otpNumber)
      //const checkUser = await checkUserExists(response.userData.email)
      //console.log(checkUser.exists)
      /*if(checkUser.exists){
        toast.error("Account exists. Account with this email already exists, login instead.")
      }
      else{}*/
      const result = await signUpNewUser(response.userData.email, response.userData.password)
      if(result.success){
        toast.success("Account created successfully!")
        router.push('/dashboard')
      } else {
        toast.error("Account creation failed. Please try again.")
        throw new Error((result as any).message || "account creation failed")
      }
    } catch (error) {
      toast.error("Wrong OTP. Please try again.")
      console.log('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGithubSignIn = async () => {
    try {
      await signIn('github', { callbackUrl: '/dashboard' })
    } catch (error) {
      toast.error("Failed to sign in with GitHub")
      console.log(error)
    }
  }

  function emailForm() {
    return (
      <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSignupSubmit}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-[1.8rem] font-bold text-[#b6b4b4]">Create an account</h1>
          <p className="text-white text-sm text-balance">
            Enter your email below to create your account
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input 
              id="email" 
              name="email"
              type="email" 
              placeholder="manan@cohortize.xyz" 
              className="border border-white/20 bg-transparent text-white placeholder:text-gray-400 focus:border-white/40 focus:outline-none" 
              required 
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="password" className="text-white">Password</Label>
            </div>
            <Input 
              id="password" 
              name="password"
              type="password" 
              className="border border-white/20 bg-transparent text-white placeholder:text-gray-400 focus:border-white/40 focus:outline-none" 
              required 
              disabled={isLoading}
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 cursor-pointer transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Signup"}
          </Button>
          <div className="relative text-center text-sm">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-600" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-black px-2 text-gray-400">
                Or continue with
              </span>
            </div>
          </div>
          <Button 
            type="button"
            variant="outline" 
            className="w-full text-black bg-white hover:bg-gray-100 cursor-pointer transition-colors" 
            onClick={handleGithubSignIn}
            disabled={isLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-2">
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                fill="currentColor"
              />
            </svg>
            Continue with GitHub
          </Button>
        </div>
        <div className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="underline underline-offset-4 text-white hover:text-gray-300 transition-colors">
            Log in
          </a>
        </div>
      </form>
    )
  }

  function otpInput() {
    return (
      <form className={cn("flex flex-col gap-6", className)} onSubmit={handleOtpSubmit} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold text-[#b6b4b4]">Enter OTP</h1>
          <p className="text-white text-sm text-balance">
            Enter the 6-digit code sent to your email
          </p>
        </div>
        <div className="grid gap-6 justify-center">
          <InputOTP 
            maxLength={6} 
            inputMode="numeric" 
            pattern="\d+"
            value={otpValue}
            onChange={(value) => setOtpValue(value)}
          >
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
          <Button 
            type="submit" 
            className="w-full bg-[rgb(44,44,44)] hover:bg-[rgb(48,48,48)] cursor-pointer"
            disabled={isLoading || otpValue.length !== 6}
          >
            {isLoading ? "Verifying..." : "Submit OTP"}
          </Button>
        </div>
      </form>
    )
  }

  return (
    otpSent ? otpInput() : emailForm()
  )
}