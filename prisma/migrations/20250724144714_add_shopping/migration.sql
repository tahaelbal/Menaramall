/*
  Warnings:

  - You are about to drop the column `category` on the `Shopping` table. All the data in the column will be lost.
  - Added the required column `description` to the `Shopping` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Shopping" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Shopping" ("createdAt", "id", "imageUrl", "name") SELECT "createdAt", "id", "imageUrl", "name" FROM "Shopping";
DROP TABLE "Shopping";
ALTER TABLE "new_Shopping" RENAME TO "Shopping";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
