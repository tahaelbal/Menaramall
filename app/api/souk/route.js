import { NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";

// ➤ GET: récupérer tous les éléments du souk
export async function GET() {
  try {
    const souks = await prisma.souk.findMany();
    return NextResponse.json(souks);
  } catch (err) {
    console.error("Erreur GET /souk:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

// ➤ POST: ajouter un nouvel élément
export async function POST(req) {
  try {
    const { title, description, imageUrl } = await req.json();

    if (!title || !description || !imageUrl) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    const souk = await prisma.souk.create({
      data: { title, description, imageUrl },
    });

    return NextResponse.json(souk, { status: 201 });
  } catch (err) {
    console.error("Erreur POST /souk:", err);
    return NextResponse.json({ error: "Erreur lors de la création" }, { status: 500 });
  }
}
