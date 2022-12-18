/*
  Warnings:

  - The `form` column on the `Ingredient` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Form" AS ENUM ('SAND', 'FLAKES', 'POWDER', 'LIQUOR', 'SPLIT', 'VISCOUS');

-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "form",
ADD COLUMN     "form" "Form";
