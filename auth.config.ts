import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { signInSchema } from "./schema";
import { getUserByEmail } from "./action/user";

export default {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validateFields = signInSchema.safeParse(credentials);

        if (validateFields.success) {
          const { email, password } = validateFields.data;
          const user = await getUserByEmail(email);

          if (!user) {
            return null;
          }

          const isPasswordMatch = await bcrypt.compare(
            password,
            user?.hashPassword || ""
          );

          if (isPasswordMatch) {
            return user;
          }
        }

        return null;
      },
    }),
  ],
  
} satisfies NextAuthConfig;
