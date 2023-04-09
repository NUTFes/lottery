import NextAuth from 'next-auth'
import KeycloakProvider from 'next-auth/providers/keycloak'

export default NextAuth({
  providers: [
    KeycloakProvider({
      clientId: process.env.NEXT_PUBLIC_KEYCLOAK_ID!,
      clientSecret: process.env.NEXT_PUBLIC_KEYCLOAK_SECRET!,
      issuer: process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER!,
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub || ''
      session.accessToken = token || ''
      return session
    },
  },
})
