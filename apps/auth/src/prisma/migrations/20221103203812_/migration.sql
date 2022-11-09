/*
  Warnings:

  - Added the required column `exp` to the `RefreshToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RefreshToken" ADD COLUMN     "exp" TIMESTAMP(3) NOT NULL;
