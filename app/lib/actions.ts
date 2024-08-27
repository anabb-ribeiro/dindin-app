'use server'
import { signIn } from '@/auth'


export async function SignIn(provider: "google" | "credentials", formData?: FormData | ({ redirectTo?: string; redirect?: true | undefined } & Record<string, any>) | undefined) {
  if (provider === "google") {
    return await signIn('google')
  }
  return await signIn("credentials", formData, { method: "POST" })
}

