'use client'
import { SignIn } from "../lib/actions";



export default function CredentialsForm() {
  return (
    <form className="text-[#484848] flex flex-col justify-center gap-2">
      <label htmlFor="email">
        Email
        <input className="input-style" name="email" id="email" type="email" required />
      </label>
      <label htmlFor="password">
        Password
        <input className="input-style" name="password" id="password" type="password" required />
      </label>
      <button className="primary-button self-center" type="submit" onSubmit={() => SignIn("credentials", FormData)}>Sign In</button>
    </form>
  )
}
