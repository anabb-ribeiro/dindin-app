/*
  Warnings:

  - You are about to drop the `Register` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Register" DROP CONSTRAINT "Register_userId_fkey";

-- DropTable
DROP TABLE "Register";

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3),
    "description" TEXT,
    "value" INTEGER NOT NULL,
    "is_income" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT NOT NULL,
    "category" "ExpenseCategory" NOT NULL DEFAULT 'OTHER',

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
