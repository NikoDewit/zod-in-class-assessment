import { z } from "zod";

export const signUpSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, "First Name is required")
      .min(2, "First name must be at least 2 characters long")
      .max(30, "First name must be 30 characters or less"),
    lastName: z
      .string()
      .trim()
      .min(1, "Last name is required")
      .min(2, "Last name must be at least 2 characters long")
      .max(30, "Last name must be 30 characters or less"),
    email: z
      .email("Must be a valid email address")
      .trim()
      .min(1, "Email is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must have an uppercase letter")
      .regex(/[a-z]/, "Password must have a lowercase letter")
      .regex(/\d/, "Password must have a numebr"),
    confrimPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confrimPassword, {
    message: "Password and Confirm Password must match",
    path: ["confrimPassword"],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
