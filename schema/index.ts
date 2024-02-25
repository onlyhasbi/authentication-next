import { z } from "zod";

export const signInSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const signUpSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters." }),
  email: z.string().min(1, { message: "Email is required" }).email(),
});
