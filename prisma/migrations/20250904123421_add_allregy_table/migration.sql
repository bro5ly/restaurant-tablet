/*
  Warnings:

  - You are about to drop the column `menuId` on the `Allergy` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Allergy" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Allergy" ("displayName", "icon", "id", "name") SELECT "displayName", "icon", "id", "name" FROM "Allergy";
DROP TABLE "Allergy";
ALTER TABLE "new_Allergy" RENAME TO "Allergy";
CREATE UNIQUE INDEX "Allergy_name_key" ON "Allergy"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
