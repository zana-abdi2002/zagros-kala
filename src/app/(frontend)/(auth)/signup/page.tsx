import SignUpForm from "@/components/auth/SignUpForm";
import Link from "next/link";

export default function page() {
  return (
    <>
      <SignUpForm />
      <p>
        Already have an account?{" "}
        <Link href="/signin" aria-label="signin" className="text-blue-500">
          Sign In
        </Link>
      </p>
    </>
  );
}
