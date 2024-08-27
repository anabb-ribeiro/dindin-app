'use client'
import { SignIn } from "../lib/actions"


export default function GoogleButton() {
  return (
    <button
      className="flex items-center justify-center w-[80%] py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-100"
      onClick={() => SignIn("google")}>
      <img src="/google-icon.png" alt="Google icon" className="w-5 h-5 mr-2" />
      Sign In with Google
    </button >

  )
}

