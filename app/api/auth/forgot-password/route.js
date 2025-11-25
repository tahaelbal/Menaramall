import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { randomBytes } from 'crypto';
import nodemailer from 'nodemailer';

export async function POST(req) {
  const { email } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
  }

  const token = randomBytes(32).toString('hex');
  const expires = new Date(Date.now() + 3600000); // 1h

  await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  // TODO: Remplace avec ton vrai transporteur (par exemple Resend ou Mailjet)
  const transporter = nodemailer.createTransport({
    host: "smtp.example.com",
    port: 587,
    auth: {
      user: "your_user",
      pass: "your_password",
    },
  });

  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    to: email,
    subject: 'Réinitialisation de mot de passe',
    text: `Cliquez ici pour réinitialiser votre mot de passe : ${resetUrl}`,
  });

  return NextResponse.json({ message: 'Email envoyé avec succès' });
}
