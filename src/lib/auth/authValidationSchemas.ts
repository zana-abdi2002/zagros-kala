import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "it must be at least 8 characters")
  .regex(/[A-Z]/, "Must include an uppercase letter")
  .regex(/[a-z]/, "Must include a lowercase letter")
  .regex(/[0-9]/, "Must include a number")
  .regex(/[^A-Za-z0-9]/, "Must include a symbol");

export const signUpEmailSchema = z.object({
  name: z
    .string()
    .min(2, "First name is required")
    .transform((name) => name.toLowerCase()),
  lastName: z
    .string()
    .min(2, "Last name is required")
    .transform((lastName) => lastName.toLowerCase()),
  email: z.email("Invalid email"),
  password: passwordSchema,
});

export type SignUpEmailInput = z.infer<typeof signUpEmailSchema>;

export const signInEmailSchema = z.object({
  email: z.email("Invalid email"),
  password: passwordSchema,
});

export type SignInEmailInput = z.infer<typeof signInEmailSchema>;

// ----------------------------------------------------------

export function formDataToObject(formData: FormData) {
  return {
    name: formData.get("name"),
    lastName: formData.get("lastName"),
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  };
}
