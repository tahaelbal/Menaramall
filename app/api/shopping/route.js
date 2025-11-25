import  prisma  from "@/lib/prisma";

export async function GET(req) {
  try {
    // On ignore volontairement les paramètres page & limit pour renvoyer tout
    const data = await prisma.shopping.findMany({
      orderBy: { id: "desc" },
    });

    return Response.json(data);
  } catch (err) {
    console.error("Erreur lors du GET /shopping:", err);
    return Response.json({ error: "Erreur de récupération" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { title, description, imageUrl, categorie } = await request.json();

    if (!title || !description || !imageUrl || !categorie) {
      return Response.json({ error: "Champs manquants" }, { status: 400 });
    }

    const item = await prisma.shopping.create({
      data: { title, description, imageUrl, categorie },
    });

    return Response.json(item);
  } catch (err) {
    console.error("Erreur ajout shopping:", err);
    return Response.json({ error: "Erreur lors de l'ajout" }, { status: 500 });
  }
}
