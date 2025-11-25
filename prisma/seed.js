import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = bcrypt.hashSync("taha", 10);

  await prisma.user.upsert({
    where: { email: "taha@admin.com" },
    update: {},
    create: {
      name: "Taha Admin",
      email: "taha@admin.com",
      password: hashedPassword,
      image: null,
    },
  });

  console.log("✅ Admin seedé avec succès");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
