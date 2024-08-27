"use client";
import { useRouter } from "next/navigation";


export default function RedirectSignUp() {
  const router = useRouter()
  return (
    <button
      onClick={() => router.push('/signup')}
      className="primary-button"
    >
      Sign Up
    </button>
  );
}