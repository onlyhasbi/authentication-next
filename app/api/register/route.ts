import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import argon2 from "argon2";
import { signUpSchema } from "@/schema";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const isValid = signUpSchema.safeParse(body);

  if (!isValid) {
    return NextResponse.json(
      { error: "Invalid personal data" },
      { status: 400 }
    );
  }

  const { username, email, password } = body;

  const isEmailExist = await prisma.user.findUnique({ where: { email } });

  if (isEmailExist) {
    return NextResponse.json({ email: "Email already taken" }, { status: 409 });
  }

  try {
    const hashPassword = await argon2.hash(password);
    await prisma.user.create({
      data: { email, name: username, hashPassword },
    });
  } catch (e) {
    return NextResponse.json(
      { error: "Error while processing" },
      { status: 403 }
    );
  }

  return NextResponse.json(
    { error: "Email verification sent" },
    { status: 201 }
  );
}
