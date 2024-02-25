import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import argon2 from "argon2";
import { signInSchema } from "@/schema";
import { User } from "@prisma/client";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const isValid = signInSchema.safeParse(body);

  if (!isValid) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const { username: name, password } = body;

  const user = await prisma.user.findFirst({
    where: { name },
  });

  if (!user) {
    return NextResponse.json(
      { username: "Username not found" },
      { status: 404 }
    );
  }

  try {
    const isMatch = await argon2.verify(user.hashPassword!, password);
    if (!isMatch) throw new Error("Incorrect password");
  } catch (e: unknown) {
    return NextResponse.json(
      { password: (e as Error).message },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: user as User }, { status: 200 });
}
