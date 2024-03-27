"use server";

import EmailTemplate from "@/components/email/template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail({
  email,
  token,
}: {
  email: string;
  token: string;
}) {
  const confirmLink = `http://localhost:3000/email-verification?token=${token}`;
  try {
    const data = await resend.emails.send({
      from: "Next <onboarding@resend.dev>",
      to: [email],
      subject: "Next email Confirmation",
      react: EmailTemplate({ email, link: confirmLink }),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
