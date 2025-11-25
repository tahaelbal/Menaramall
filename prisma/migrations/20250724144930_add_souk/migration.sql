/*
  Warnings:

  - You are about to drop the column `title` on the `Souk` table. All the data in the column will be lost.
  - Added the required column `name` to the `Souk` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Souk" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Souk" ("createdAt", "description", "id", "imageUrl") SELECT "createdAt", "description", "id", "imageUrl" FROM "Souk";
DROP TABLE "Souk";
ALTER TABLE "new_Souk" RENAME TO "Souk";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
