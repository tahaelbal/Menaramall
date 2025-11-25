/*
  Warnings:

  - You are about to drop the `Restaurant` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `Shopping` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Shopping` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Shopping` table. All the data in the column will be lost.
  - The primary key for the `Souk` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Souk` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Souk` table. All the data in the column will be lost.
  - Added the required column `title` to the `Shopping` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Souk` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Restaurant";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Restaurants" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Shopping" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL
);
INSERT INTO "new_Shopping" ("description", "id", "imageUrl") SELECT "description", "id", "imageUrl" FROM "Shopping";
DROP TABLE "Shopping";
ALTER TABLE "new_Shopping" RENAME TO "Shopping";
CREATE TABLE "new_Souk" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL
);
INSERT INTO "new_Souk" ("description", "id", "imageUrl") SELECT "description", "id", "imageUrl" FROM "Souk";
DROP TABLE "Souk";
ALTER TABLE "new_Souk" RENAME TO "Souk";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
