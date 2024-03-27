"use server";

import { signUpSchema } from "@/schema";
import { z } from "zod";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";
import { getUserByEmail } from "./user";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (payload: z.infer<typeof signUpSchema>) => {
  const isValid = signUpSchema.safeParse(
    payload as z.infer<typeof signUpSchema>
  );

  if (!isValid.success) {
    return { error: "Invalid personal data" };
  }

  const { username, email, password } = isValid.data;

  const isEmailExist = await getUserByEmail(email);

  if (isEmailExist) {
    return { email: "Email already taken" };
  }

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { email, name: username, hashPassword },
    });

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail({
      email: verificationToken.email,
      token: verificationToken.token,
    });

    return { success: "Confirmation email sent" };
  } catch (e) {
    return { error: "Error while processing" };
  }
};
