"use client"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useAuthDialogStore } from "@/app/stores/useAuthDialogStore"
import { useAuth } from "@/app/context/AuthContext"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const open = useAuthDialogStore((state) => state.open)
  const {//session, 
    signInUser} = useAuth()
  const router = useRouter()
  
  const handleSignInSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    if(password.length < 8){
      toast.error("Password must be at least 8 characters long")
      return
    }
    try{
      const signIn = await signInUser({email, password})
      if(!signIn.success){
        toast("invalid creds")
        return
      }

      toast("Log In successful!")
      router.push("/dashboard")
    }
    catch(err)
    {console.log(err)
      toast.error("Login error occured")
    }
  }

  const handleGitHubSignIn = async () => {
    //github oauth here
    console.log("GitHub sign in clicked")
    
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-[1.8rem] font-bold text-[#b6b4b4]">Login to Cohortize</h1>
        <p className="text-white text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <form onSubmit={handleSignInSubmit} className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input 
              id="email" 
              type="email" 
              name="email"
              placeholder="manan@cohortize.xyz" 
              className="border border-white/20 bg-transparent text-white placeholder:text-gray-400 focus:border-white/40 focus:outline-none" 
              required 
            />
          </div>
          <div className="grid gap-3">
            <div className="flex items-center">
              <Label htmlFor="password" className="text-white">Password</Label>
              <button
                type="button"
                className="ml-auto text-sm underline-offset-4 hover:underline text-gray-400 hover:text-white cursor-pointer transition-colors"
                onClick={() => open("forgot-password")}
              >
                Forgot your password?
              </button>
            </div>
            <Input 
              id="password" 
              type="password" 
              name="password"
              className="border border-white/20 bg-transparent text-white placeholder:text-gray-400 focus:border-white/40 focus:outline-none" 
              required 
            />
          </div>
          <Button type="submit" className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 cursor-pointer transition-colors">
            Login
          </Button>
        </form>
        
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
          onClick={handleGitHubSignIn}
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
        Don&apos;t have an account?{" "}
        <a href="#" className="underline underline-offset-4 text-white hover:text-gray-300 transition-colors">
          Sign up
        </a>
      </div>
    </div>
  )
}