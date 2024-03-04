"use server";

import { auth } from "@/auth";

export const isAuthenticated = async () => await auth();
