"use server";

import { auth, signOut } from "@/auth";

export const isAuthenticated = async () => await auth();

export const signout = async () => {
  await signOut();
};
