'use client'

import Link from "next/link"

function SignUpForm() {
  return (
    <div className="w-[35%] h-[95%] bg-white rounded-[5px] flex flex-col justify-between items-center self-center p-5 gap-3">
      <h1 className="text-[#6460FB] text-[28px]">Sign Up</h1>
      <form className="text-[#484848] flex flex-col justify-center gap-4">
        <label htmlFor="name">
          Name
          <input className="input-style" name="name" id="name" required />
        </label>
        <label htmlFor="email">
          Email
          <input className="input-style" name="email" id="email" type="email" required />
        </label>
        <label htmlFor="password">
          Password
          <input className="input-style" name="password" id="password" type="password" required />
        </label>
        <label htmlFor="passwordConfirm">
          Password Confirmation
          <input className="input-style" name="passwordConfirm" id="passwordConfirm" type="password" required />
        </label>
        <button className="primary-button self-center" type="submit">Sign In</button>
      </form>
      <Link href="/" className="text-[#6460FB] text-[12px]">Already have an account? Click here to sign in.</Link>
    </div>
  )
}

export default SignUpForm