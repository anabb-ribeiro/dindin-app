import NextAuth from "next-auth"
import type { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import Google from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { loginSchema } from "./app/api/zodSchema";
import { prisma } from './prisma/client'
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";


export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({ clientId: process.env.AUTH_GOOGLE_ID, clientSecret: process.env.AUTH_GOOGLE_SECRET }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: { label: 'Password', type: 'password', placeholder: 'Password' },
      },
      async authorize(credentials): Promise<any> {

        if (!credentials?.email || !credentials?.password) return null;

        const { email, password } = await loginSchema.parseAsync(credentials)

        try {
          const user = await prisma.user.findUnique({
            where: { email }
          });

          if (!user) return null
          if (!user.password) return null

          const passwordMatch = bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            return null
          }

          return { id: user.id, email: user.email, name: user.name }

        } catch (error) {
          console.log(error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (typeof token.id === 'string') {
        session.user.id = token.id;
      } else {
        session.user.id = '';
      }
      return session
    },
    async authorized({ auth }) {
      return !!auth
    }
  },
  pages: {
    signIn: "/signin"
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig)