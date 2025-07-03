import { LoginForm } from "../components/global/login-form";

export default function Login(){
    return(
        <div className="min-h-screen w-full bg-black flex items-center justify-center p-4">
            <div className="bg-black p-6 sm:p-8 w-full max-w-xs sm:max-w-sm rounded-lg border border-white/20">
                <LoginForm /> 
            </div>
        </div>
    )
}