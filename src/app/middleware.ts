import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    console.log('Token:', req.nextauth.token)
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    },
  }
)

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/settings/:path*']
}