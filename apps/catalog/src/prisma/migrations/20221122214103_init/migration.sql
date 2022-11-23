-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Raw" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Raw_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "recipeTypeUuid" TEXT NOT NULL,
    "categoryUuid" TEXT NOT NULL,
    "rawUuid" TEXT NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "form" TEXT,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IngredientQty" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "uuid" TEXT NOT NULL,
    "qtyPerKg" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "IngredientQty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeType" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "RecipeType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "uuid" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" INTEGER,
    "description" TEXT,
    "recipeTypeUuid" TEXT NOT NULL,
    "categoryUuid" TEXT NOT NULL,
    "rawUuid" TEXT NOT NULL,
    "recipeUuid" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToRaw" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_IngredientToIngredientQty" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_IngredientQtyToRecipe" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_uuid_key" ON "Category"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Category_title_key" ON "Category"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Raw_uuid_key" ON "Raw"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Raw_title_key" ON "Raw"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_uuid_key" ON "Recipe"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_uuid_key" ON "Ingredient"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "IngredientQty_uuid_key" ON "IngredientQty"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeType_uuid_key" ON "RecipeType"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "RecipeType_title_key" ON "RecipeType"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Product_uuid_key" ON "Product"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToRaw_AB_unique" ON "_CategoryToRaw"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToRaw_B_index" ON "_CategoryToRaw"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_IngredientToIngredientQty_AB_unique" ON "_IngredientToIngredientQty"("A", "B");

-- CreateIndex
CREATE INDEX "_IngredientToIngredientQty_B_index" ON "_IngredientToIngredientQty"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_IngredientQtyToRecipe_AB_unique" ON "_IngredientQtyToRecipe"("A", "B");

-- CreateIndex
CREATE INDEX "_IngredientQtyToRecipe_B_index" ON "_IngredientQtyToRecipe"("B");

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_recipeTypeUuid_fkey" FOREIGN KEY ("recipeTypeUuid") REFERENCES "RecipeType"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_categoryUuid_fkey" FOREIGN KEY ("categoryUuid") REFERENCES "Category"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_rawUuid_fkey" FOREIGN KEY ("rawUuid") REFERENCES "Raw"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryUuid_fkey" FOREIGN KEY ("categoryUuid") REFERENCES "Category"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_rawUuid_fkey" FOREIGN KEY ("rawUuid") REFERENCES "Raw"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_recipeTypeUuid_fkey" FOREIGN KEY ("recipeTypeUuid") REFERENCES "RecipeType"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_recipeUuid_fkey" FOREIGN KEY ("recipeUuid") REFERENCES "Recipe"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToRaw" ADD CONSTRAINT "_CategoryToRaw_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToRaw" ADD CONSTRAINT "_CategoryToRaw_B_fkey" FOREIGN KEY ("B") REFERENCES "Raw"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToIngredientQty" ADD CONSTRAINT "_IngredientToIngredientQty_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToIngredientQty" ADD CONSTRAINT "_IngredientToIngredientQty_B_fkey" FOREIGN KEY ("B") REFERENCES "IngredientQty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientQtyToRecipe" ADD CONSTRAINT "_IngredientQtyToRecipe_A_fkey" FOREIGN KEY ("A") REFERENCES "IngredientQty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientQtyToRecipe" ADD CONSTRAINT "_IngredientQtyToRecipe_B_fkey" FOREIGN KEY ("B") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
