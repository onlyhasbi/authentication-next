"use server";

import { auth, signOut } from "@/auth";
import { PUBLIC } from "@/route";

export const signout = async () => {
  const session = await auth();
  if (session) {
    await signOut({ redirectTo: PUBLIC[0] });
  }
};
