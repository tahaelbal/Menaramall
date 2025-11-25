import { NextResponse } from "next/server";
import prisma  from "@/lib/prisma";

// 🔴 SUPPRIMER
export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    await prisma.shopping.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: "Supprimé avec succès" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
  }
}

// ✅ AJOUTER : méthode PUT pour modifier un article
export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();

  const { title, description, imageUrl, categorie } = body;

  if (!title || !description || !imageUrl || !categorie) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  }

  try {
    const updatedShop = await prisma.shopping.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        imageUrl,
        categorie,
      },
    });

    return NextResponse.json(updatedShop);
  } catch (error) {
    console.error("Erreur mise à jour :", error);
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 });
  }
}
