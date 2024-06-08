/*
  Warnings:

  - You are about to drop the column `avatar_img` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ExpenseCategory" AS ENUM ('GROCERIES', 'PERSONAL_CARE', 'SHOPPING', 'HOME', 'ENTERTAINMENT', 'TRANSPORTATION', 'UTILITIES', 'HEALTHCARE', 'EDUCATION', 'OTHER');

-- AlterTable
ALTER TABLE "Register" ADD COLUMN     "category" "ExpenseCategory" NOT NULL DEFAULT 'OTHER';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "avatar_img";
