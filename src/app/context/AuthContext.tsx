"use client"
import { createContext, useEffect, useState, useContext, Children, ReactNode } from "react";

interface AuthContextValue {
  session: string | null;
  setSession: (session: string | null) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [session, setSession] = useState<string | null>(null);
  
  return (
    <AuthContext.Provider value={{ session, setSession }}>
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