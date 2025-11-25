import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const restaurants = await prisma.restaurant.findMany();
  return NextResponse.json(restaurants);
}

export async function POST(req) {
  const body = await req.json();
  const restaurant = await prisma.restaurant.create({
    data: {
      title: body.title,
      description: body.description,
      imageUrl: body.imageUrl,
    },
  });
  return NextResponse.json(restaurant);
}
