// app/api/reset-password/request/route.js
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { Resend } from "resend";
import prisma from "@/lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const { email } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: "Email introuvable" }, { status: 404 });
  }

  const token = uuidv4();
  const expires = new Date(Date.now() + 1000 * 60 * 30); // expire dans 30 minutes

  await prisma.passwordResetToken.create({
    data: { email, token, expires },
  });

  const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

  await resend.emails.send({
    from: "admin@menaramall.com",
    to: email,
    subject: "Réinitialisation de votre mot de passe",
    html: `<p>Bonjour,</p><p>Cliquez sur ce lien pour réinitialiser votre mot de passe : <a href="${resetLink}">${resetLink}</a></p>`,
  });

  return NextResponse.json({ message: "Email envoyé" });
}

