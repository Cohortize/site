import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
//import bcrypt from 'bcrypt'

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }
                
                // const user = await verifyUser(credentials.email, credentials.password)
                // if (!user) return null
                
                return {
                    id: '1', 
                    email: credentials.email,
                    name: 'User Name',
                }
            },
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async redirect({ url, baseUrl }) {
            if (url.startsWith(baseUrl)) return url
            if (url.startsWith('/')) return new URL(url, baseUrl).toString()
            return baseUrl + '/dashboard'
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.sub,
                }
            }
        },
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id
            }
            return token
        }
    },
    pages: {
        signIn: '/login',
    }
});

export { handler as GET, handler as POST };