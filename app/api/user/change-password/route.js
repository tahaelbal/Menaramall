import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import prisma from "@/lib/prisma";
import { compare, hash } from "bcryptjs";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  const { name, currentPassword, newPassword } = await req.json();

  if (!session?.user?.email) {
    return new Response(JSON.stringify({ error: "Non autorisé" }), { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });

  if (!user || !(await compare(currentPassword, user.password))) {
    return new Response(JSON.stringify({ error: "Mot de passe actuel incorrect" }), { status: 400 });
  }

  const hashedPassword = await hash(newPassword, 10);

  await prisma.user.update({
    where: { email: session.user.email },
    data: {
      password: hashedPassword,
      name,
    },
  });

  return new Response(JSON.stringify({ message: "Mot de passe mis à jour" }), { status: 200 });
}
