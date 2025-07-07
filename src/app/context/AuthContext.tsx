"use client"
import { createContext, useEffect, useState, useContext, ReactNode } from "react";
import { supabase } from "@/lib/supabase/client";
import { Session } from "@supabase/supabase-js";

interface AuthContextValue {
  session: Session | null;
  setSession: (session: Session | null) => void;
  signUpNewUser: (email: string, password: string) => Promise<{success: boolean, error?: any, data?: any}>;
  signInUser: (credentials: {email: string, password: string}) => Promise<{success: boolean, error?: string, data?: any}>;
  signOut: () => Promise<void>;
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
  
  //sign in function
  const signInUser = async ({email, password}: {email: string, password: string}) => {
    try {
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
  
  return (
    <AuthContext.Provider value={{ session, setSession, signUpNewUser, signInUser, signOut }}>
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