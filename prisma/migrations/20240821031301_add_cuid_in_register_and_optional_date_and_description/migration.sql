/*
  Warnings:

  - The primary key for the `Register` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Register" DROP CONSTRAINT "Register_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "date" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ADD CONSTRAINT "Register_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Register_id_seq";
