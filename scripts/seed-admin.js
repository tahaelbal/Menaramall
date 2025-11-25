// scripts/seed-admin.js

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@menara.com";
  const name = "Admin Menara";
  const image = "/img/profil.png";
  const plainPassword = "menara123";
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    console.log("ℹ️ L'utilisateur existe déjà :", email);
  } else {
    await prisma.user.create({
      data: {
        email,
        name,
        image,
        password: hashedPassword,
      },
    });
    console.log("✅ Utilisateur admin créé !");
  }
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors du seed :", e);
  })
  .finally(() => {
    prisma.$disconnect();
  });
