"use client";

import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  formDataToObject,
  signInEmailSchema,
} from "../../lib/auth/authValidationSchemas";
type FieldName = "email" | "password";

function SignInForm() {
  const [isPending, setIsPending] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const router = useRouter();

  // Validate on blur for individual fields
  const handleChange = (fieldName: FieldName, value: string) => {
    const fieldSchema = signInEmailSchema.shape[fieldName];
    const result = fieldSchema.safeParse(value);

    if (!result.success) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: result.error.issues[0]?.message,
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: null,
      }));
    }
  };

  // Full validation on submit
  const handleSubmit = async (formData: FormData) => {
    const parsed = signInEmailSchema.safeParse(formDataToObject(formData));

    if (!parsed.success) {
      alert("Fill all fields correctly");
    } else {
      await authClient.signIn.email(
        {
          ...parsed.data,
        },
        {
          onRequest() {
            setIsPending(true);
          },
          onError: (ctx) => {
            // display the error message
            setIsPending(false);
            alert(ctx.error.message);
          },
          onSuccess() {
            router.push("/");
          },
        },
      );
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(new FormData(e.currentTarget));
      }}
      className="flex flex-col"
    >
      <input
        type="text"
        name="email"
        id="email"
        autoComplete="username"
        onChange={(e) => {
          handleChange("email", e.target.value);
        }}
      />
      {errors.email}

      <input
        type="password"
        name="password"
        id="password"
        autoComplete="current-password"
        onChange={(e) => {
          handleChange("password", e.target.value);
        }}
      />
      {errors.password}

      <button disabled={isPending} type="submit">
        {isPending ? "Signing in…" : "Submit"}
      </button>
    </form>
  );
}

export default SignInForm;
