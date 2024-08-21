import NextAuth, { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import Google from "next-auth/providers/google";
import { loginSchema } from "../../zodSchema";
import { prisma } from '../../../../prisma/client'
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";


export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
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
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig)

export const { GET, POST } = handlers