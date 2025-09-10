-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Menu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "categoryId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isRecommended" BOOLEAN NOT NULL DEFAULT false,
    "price" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Menu_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Menu" ("categoryId", "createdAt", "description", "id", "image", "isActive", "name", "price") SELECT "categoryId", "createdAt", "description", "id", "image", "isActive", "name", "price" FROM "Menu";
DROP TABLE "Menu";
ALTER TABLE "new_Menu" RENAME TO "Menu";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
