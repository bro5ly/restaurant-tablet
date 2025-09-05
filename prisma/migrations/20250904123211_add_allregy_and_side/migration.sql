-- CreateTable
CREATE TABLE "Allergy" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "menuId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "icon" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MenuSideOptions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_MenuSideOptions_A_fkey" FOREIGN KEY ("A") REFERENCES "Menu" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_MenuSideOptions_B_fkey" FOREIGN KEY ("B") REFERENCES "Menu" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_AllergyToMenu" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AllergyToMenu_A_fkey" FOREIGN KEY ("A") REFERENCES "Allergy" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AllergyToMenu_B_fkey" FOREIGN KEY ("B") REFERENCES "Menu" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Allergy_name_key" ON "Allergy"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_MenuSideOptions_AB_unique" ON "_MenuSideOptions"("A", "B");

-- CreateIndex
CREATE INDEX "_MenuSideOptions_B_index" ON "_MenuSideOptions"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AllergyToMenu_AB_unique" ON "_AllergyToMenu"("A", "B");

-- CreateIndex
CREATE INDEX "_AllergyToMenu_B_index" ON "_AllergyToMenu"("B");
