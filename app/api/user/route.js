import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";


export async function GET(req) {
  try {
    const headers = Object.fromEntries(req.headers.entries());
    const cookies = req.headers.get("cookie") || "";

    const session = await getServerSession({ headers, cookies },authOptions);

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Erreur dans GET /api/user:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const headers = Object.fromEntries(req.headers.entries());
    const cookies = req.headers.get("cookie") || "";

    const session = await unstable_getServerSession(
      { headers, cookies },
      authOptions
    );

    if (!session) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { name, image } = await req.json();

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { name, image },
    });

    return NextResponse.json({
      message: "Profil mis à jour avec succès",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Erreur dans PATCH /api/user:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
