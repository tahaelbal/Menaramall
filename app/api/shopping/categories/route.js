// /app/api/shopping/categories/route.js
import prisma  from '@/lib/prisma';

export async function GET() {
  try {
    const categories = await prisma.shopping.findMany({
      select: { categorie: true },
      distinct: ['categorie'],
    });
    const uniqueCategories = categories.map((item) => item.categorie);
    return new Response(JSON.stringify(uniqueCategories), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Erreur récupération catégories' }),
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { categorie } = await request.json();

    if (!categorie || typeof categorie !== 'string' || categorie.trim() === '') {
      return new Response(
        JSON.stringify({ error: 'Catégorie invalide' }),
        { status: 400 }
      );
    }

    const existing = await prisma.shopping.findFirst({
      where: { categorie: categorie.trim() },
    });

    if (existing) {
      return new Response(
        JSON.stringify({ error: 'Catégorie déjà existante' }),
        { status: 400 }
      );
    }

    // On crée un nouvel élément shopping avec cette catégorie pour "ajouter" la catégorie
    // Si tu as une table de catégories dédiée, il faudrait l’utiliser ici à la place.
    await prisma.shopping.create({
      data: {
        title: `Nouvelle catégorie: ${categorie.trim()}`, // exemple générique
        description: `Catégorie créée automatiquement`,
        imageUrl: '', // ou une image par défaut
        categorie: categorie.trim(),
      },
    });

    return new Response(
      JSON.stringify({ message: 'Catégorie ajoutée' }),
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: 'Erreur lors de l’ajout catégorie' }),
      { status: 500 }
    );
  }
}
