import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET one kidzo
export async function GET(_, { params }) {
  const { id } = params;
  const kidzo = await prisma.kidzo.findUnique({
    where: { id: parseInt(id) },
  });
  if (!kidzo) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(kidzo);
}

// UPDATE kidzo
export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();
  const { title, description, imageUrl } = body;

  const updatedKidzo = await prisma.kidzo.update({
    where: { id: parseInt(id) },
    data: { title, description, imageUrl },
  });

  return NextResponse.json(updatedKidzo);
}

// DELETE kidzo
export async function DELETE(_, { params }) {
  const { id } = params;
  await prisma.kidzo.delete({
    where: { id: parseInt(id) },
  });
  return NextResponse.json({ message: "Deleted successfully" });
}
