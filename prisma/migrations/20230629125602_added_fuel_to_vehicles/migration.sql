/*
  Warnings:

  - Added the required column `fuel` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vehicles" ADD COLUMN     "fuel" TEXT NOT NULL;
