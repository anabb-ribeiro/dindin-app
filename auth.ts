import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { loginSchema } from "./app/api/schema";
import prisma from "./prisma/client";
import { ZodError } from "zod";
import bcrypt from "bcrypt";


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: { label: 'Password', type: 'password', placeholder: 'Password' },
      },
      authorize: async (credentials): Promise<any> => {

        if (!credentials?.email || !credentials?.password) return null;

        try {
          const { email, password } = await loginSchema.parseAsync(credentials)

          const user = await prisma.user.findUnique({
            where: { email }
          });

          if (!user) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            return null
          }

          return { id: user.id, email: user.email, name: user.name }

        } catch (error) {
          if (error instanceof ZodError) {
            return null
          }
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    newUser: '/api/register'
  }
})

