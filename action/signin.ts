"use server";

import { signIn } from "@/auth";
import { DEFAULT_REDIRECT } from "@/route";
import { signInSchema } from "@/schema";
import { AuthError } from "next-auth";
import { z } from "zod";
import { getUserByEmail } from "./user";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

export const authenticate = async (values: z.infer<typeof signInSchema>) => {
  const validate = signInSchema.safeParse(values);

  if (!validate.success) {
    return { error: "Invalid credentials" };
  }

  const { email, password } = validate.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email) {
    return { error: "Email not registered" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail({
      email: verificationToken.email,
      token: verificationToken.token,
    });

    return { success: "Confirmation email sent" };
  }

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
          return { error: "Invalid credentials" };
        default:
          return { error: "Something wrong" };
      }
    }
    throw error;
  }
};
