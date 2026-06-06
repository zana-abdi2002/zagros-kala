import SignInForm from "@/components/auth/SignInForm";
import Link from "next/link";

export default function page() {
  return (
    <>
      <SignInForm />

      <p>
        You don&apos;t have an account?{" "}
        <Link href="/signup" aria-label="signup" className="text-blue-500">
          Sign Up
        </Link>
      </p>
    </>
  );
}
