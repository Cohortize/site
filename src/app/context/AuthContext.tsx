"use client"
import { createContext, useEffect, useState, useContext, ReactNode } from "react";
import { supabase } from "@/lib/supabase/client";
import { Session } from "@supabase/supabase-js";

interface AuthContextValue {
  session: Session | null;
  setSession: (session: Session | null) => void;
  signUpNewUser: (email: string, password: string) => Promise<{success: boolean, error?: unknown, data?: unknown}>;
  signInUser: (credentials: {email: string, password: string}) => Promise<{success: boolean, error?: string, data?: unknown}>;
  signOut: () => Promise<void>;
  updatePassword: (email: string, newPassword: string) => Promise<{success: boolean, error?: string, message?: string}>;
  updateCurrentUserPassword: (newPassword: string) => Promise<{success: boolean, error?: string, message?: string}>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  
  // signup function
  const signUpNewUser = async (email: string, password: string) => {
    const {data, error} = await supabase.auth.signUp({
        email: email,
        password: password,  
    })
    if(error){
        console.error("there was a problem", error)
        return {success: false, error}
    }
    return {success: true, data}
  }
  
  //sign in function with account checking
  const signInUser = async ({email, password}: {email: string, password: string}) => {
    try {
        const response = await fetch('/api/check-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });

        const userCheckResult = await response.json();

        if (!response.ok || !userCheckResult.exists) {
            return {
                success: false, 
                error: "Account not found. Please sign up first."
            };
        }

        const {data, error} = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })
        if (error) {
            console.error('sign in error', error)
            return {success: false, error: error.message}
        }
        console.log("signin successful ", data)
        return {success: true, data}
    } catch (error) {
        console.error("error occured", error)
        return {success: false, error: "An unexpected error occurred"}
    }
  }


  useEffect(() => {
    supabase.auth.getSession().then(({data: {session}}) => {
        setSession(session);
    })
    
    const {data: {subscription}} = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
    })
    return () => subscription.unsubscribe();
  }, [])
  
  //sign out function
  const signOut = async () => {
    const {error} = await supabase.auth.signOut()
    if (error) {
        console.error("something wrong", error)
        throw error
    }
  }
  
  // forget password function (not exactly a function but a hook to the backend endpoint to update the password)
const updatePassword = async (email: string, newPassword: string) => {
  console.log('updatePassword called with:', { email, passwordLength: newPassword.length });
  
  try {
    console.log('Making fetch request...');
    
    const response = await fetch('/api/update-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, newPassword})
    });

    console.log('Fetch response:', response.status, response.statusText);
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Non-JSON response:', text);
      return {
        success: false,
        error: 'Server returned invalid response'
      };
    }

    const result = await response.json();
    console.log('Parsed result:', result);

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Password reset failed'
      };
    }
    
    return { 
      success: true,
      message: result.message || 'Password reset successful'
    };
  } catch (error) {
    console.error('password reset error', error);
    return { 
      success: false,
      error: 'Network error occurred'
    };
  }
}

  const updateCurrentUserPassword = async (newPassword: string) => {
    try{
      const {error} = await supabase.auth.updateUser({
        password: newPassword
      })
      if(error){
        console.error('password update error occurred', error)
        return{
          success: false,
          error: error.message
        }
      }
      return {success: true, message: 'Password reset successful'}
    }
    catch(error){
      console.error('Password update error: ', error)
      return {success: false, error: 'An unexpected error occured'}
    }
  }

  return (
    <AuthContext.Provider value={{ 
      session, 
      setSession, 
      signUpNewUser, 
      signInUser, 
      signOut, 
      updatePassword,
      updateCurrentUserPassword 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  
  return context;
};

export const UserAuth = useAuth;