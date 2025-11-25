import  prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    const { title, description, imageUrl } = await req.json();
    const id = params.id; // directement la string, pas Number()

    const updated = await prisma.souk.update({
      where: { id },
      data: { title, description, imageUrl },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("Erreur PUT /souk/[id]:", err);
    return NextResponse.json({ error: "Erreur lors de la mise à jour" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const id = params.id; // string
    await prisma.souk.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Supprimé avec succès" });
  } catch (err) {
    console.error("Erreur DELETE /souk/[id]:", err);
    return NextResponse.json({ error: "Erreur lors de la suppression" }, { status: 500 });
  }
}
