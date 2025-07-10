'use client'

interface User {
  name?: string | null
  email?: string | null
}

interface Session {
  user?: User
}

export function DashboardContent({
    session
}: {
    session: Session
}) {
    return (
        <div className="text-white">
            <p>duppity duppity dashboard!</p>
            <p>Welcome {session.user?.name || session.user?.email}!</p>
        </div>
    )
}