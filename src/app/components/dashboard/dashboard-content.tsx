'use client'
/*
import { useState } from "react"
import { signOut } from "next-auth/react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
*/

interface User {
  name?: string | null
  email?: string | null
}

interface Session {
  user?: User
}

export function DashboardContent(
    {session}: {session: Session}
){
    return(
        <div className="text-white"><p>duppity duppity dashboard!</p>
        <p>Welcome {session.user?.name || session.user?.email}
            </p></div>
    )
}