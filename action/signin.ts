"use server";

import { signIn } from "@/auth";
import { DEFAULT_REDIRECT } from "@/route";
import { signInSchema } from "@/schema";
import { AuthError } from "next-auth";
import { z } from "zod";

export const authenticate = async ({
  email,
  password,
}: z.infer<typeof signInSchema>) => {
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials";
        default:
          return { error: "Something wrong" };
      }
    }
    throw error;
  }
};
