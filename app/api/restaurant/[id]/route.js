import { NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";

export async function GET(req, { params }) {
  const { id } = params;
  const restaurant = await prisma.restaurant.findUnique({
    where: { id: Number(id) },
  });
  if (!restaurant) {
    return NextResponse.json({ error: "Restaurant non trouvé" }, { status: 404 });
  }
  return NextResponse.json(restaurant);
}

export async function DELETE(req, { params }) {
  const { id } = params;
  await prisma.restaurant.delete({ where: { id: Number(id) } });
  return NextResponse.json({ message: "Restaurant supprimé" });
}

export async function PUT(req, { params }) {
  const { id } = params;
  const body = await req.json();
  const updated = await prisma.restaurant.update({
    where: { id: Number(id) },
    data: {
      title: body.title,
      description: body.description,
      imageUrl: body.imageUrl,
    },
  });
  return NextResponse.json(updated);
}



