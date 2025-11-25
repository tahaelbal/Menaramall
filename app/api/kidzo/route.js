import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all kidzos
export async function GET() {
  try {
    const kidzos = await prisma.kidzo.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(kidzos);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// CREATE new kidzo
export async function POST(req) {
  try {
    const body = await req.json();
    const { title, description, imageUrl } = body;

    const newKidzo = await prisma.kidzo.create({
      data: { title, description, imageUrl },
    });

    return NextResponse.json(newKidzo, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
