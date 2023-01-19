-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "alias" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RawType" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "alias" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "RawType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Raw" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "alias" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "payload" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Raw_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeType" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "alias" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "RecipeType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "alias" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "alias" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER,
    "recipeUuid" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "alias" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "payload" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IngredientCoefficient" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "coefficient" DOUBLE PRECISION NOT NULL,
    "recipeUuid" TEXT,
    "ingredientUuid" TEXT,

    CONSTRAINT "IngredientCoefficient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CategoryToRecipe" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RawTypeToRecipe" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RawToRecipe" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RecipeToRecipeType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductToRaw" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductToRawType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductToRecipeType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_uuid_key" ON "Category"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Category_alias_key" ON "Category"("alias");

-- CreateIndex
CREATE UNIQUE INDEX "Category_title_key" ON "Category"("title");

-- CreateIndex
CREATE UNIQUE INDEX "RawType_uuid_key" ON "RawType"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "RawType_alias_key" ON "RawType"("alias");

-- CreateIndex
CREATE UNIQUE INDEX "RawType_title_key" ON "RawType"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Raw_uuid_key" ON "Raw"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Raw_alias_key" ON "Raw"("alias");

-- CreateIndex
CREATE UNIQUE INDEX "Raw_title_key" ON "Raw"("title");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeType_uuid_key" ON "RecipeType"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeType_alias_key" ON "RecipeType"("alias");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeType_title_key" ON "RecipeType"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_uuid_key" ON "Recipe"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_alias_key" ON "Recipe"("alias");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_title_key" ON "Recipe"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Product_uuid_key" ON "Product"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Product_alias_key" ON "Product"("alias");

-- CreateIndex
CREATE UNIQUE INDEX "Product_title_key" ON "Product"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_uuid_key" ON "Ingredient"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_alias_key" ON "Ingredient"("alias");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_title_key" ON "Ingredient"("title");

-- CreateIndex
CREATE UNIQUE INDEX "IngredientCoefficient_uuid_key" ON "IngredientCoefficient"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToProduct_AB_unique" ON "_CategoryToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToProduct_B_index" ON "_CategoryToProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToRecipe_AB_unique" ON "_CategoryToRecipe"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToRecipe_B_index" ON "_CategoryToRecipe"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RawTypeToRecipe_AB_unique" ON "_RawTypeToRecipe"("A", "B");

-- CreateIndex
CREATE INDEX "_RawTypeToRecipe_B_index" ON "_RawTypeToRecipe"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RawToRecipe_AB_unique" ON "_RawToRecipe"("A", "B");

-- CreateIndex
CREATE INDEX "_RawToRecipe_B_index" ON "_RawToRecipe"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RecipeToRecipeType_AB_unique" ON "_RecipeToRecipeType"("A", "B");

-- CreateIndex
CREATE INDEX "_RecipeToRecipeType_B_index" ON "_RecipeToRecipeType"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToRaw_AB_unique" ON "_ProductToRaw"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToRaw_B_index" ON "_ProductToRaw"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToRawType_AB_unique" ON "_ProductToRawType"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToRawType_B_index" ON "_ProductToRawType"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToRecipeType_AB_unique" ON "_ProductToRecipeType"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToRecipeType_B_index" ON "_ProductToRecipeType"("B");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_recipeUuid_fkey" FOREIGN KEY ("recipeUuid") REFERENCES "Recipe"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientCoefficient" ADD CONSTRAINT "IngredientCoefficient_recipeUuid_fkey" FOREIGN KEY ("recipeUuid") REFERENCES "Recipe"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientCoefficient" ADD CONSTRAINT "IngredientCoefficient_ingredientUuid_fkey" FOREIGN KEY ("ingredientUuid") REFERENCES "Ingredient"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToProduct" ADD CONSTRAINT "_CategoryToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToProduct" ADD CONSTRAINT "_CategoryToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToRecipe" ADD CONSTRAINT "_CategoryToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToRecipe" ADD CONSTRAINT "_CategoryToRecipe_B_fkey" FOREIGN KEY ("B") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RawTypeToRecipe" ADD CONSTRAINT "_RawTypeToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "RawType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RawTypeToRecipe" ADD CONSTRAINT "_RawTypeToRecipe_B_fkey" FOREIGN KEY ("B") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RawToRecipe" ADD CONSTRAINT "_RawToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "Raw"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RawToRecipe" ADD CONSTRAINT "_RawToRecipe_B_fkey" FOREIGN KEY ("B") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeToRecipeType" ADD CONSTRAINT "_RecipeToRecipeType_A_fkey" FOREIGN KEY ("A") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeToRecipeType" ADD CONSTRAINT "_RecipeToRecipeType_B_fkey" FOREIGN KEY ("B") REFERENCES "RecipeType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToRaw" ADD CONSTRAINT "_ProductToRaw_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToRaw" ADD CONSTRAINT "_ProductToRaw_B_fkey" FOREIGN KEY ("B") REFERENCES "Raw"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToRawType" ADD CONSTRAINT "_ProductToRawType_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToRawType" ADD CONSTRAINT "_ProductToRawType_B_fkey" FOREIGN KEY ("B") REFERENCES "RawType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToRecipeType" ADD CONSTRAINT "_ProductToRecipeType_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToRecipeType" ADD CONSTRAINT "_ProductToRecipeType_B_fkey" FOREIGN KEY ("B") REFERENCES "RecipeType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
