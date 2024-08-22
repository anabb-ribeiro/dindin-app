import { prisma } from "../../../prisma/client"
import { NextRequest, NextResponse } from "next/server";
import { transactionBodySchema, categorySchema } from "../zodSchema";

interface transactionBody {
  userId: string;
  category: string;
  value: number;
  description?: string;
  date?: string;
}

export async function POST(request: NextRequest) {
  const body: transactionBody = await request.json();
  const bodyValidation = transactionBodySchema.safeParse(body)
  const categoryValidation = categorySchema.safeParse(body.category);

  if (!bodyValidation.success) {
    return NextResponse.json(bodyValidation.error, { status: 400 })
  }
  if (!categoryValidation.success) {
    return NextResponse.json(bodyValidation.error, { status: 400 })
  }
  try {
    const newTransaction = await prisma.transaction.create({
      data: {
        userId: body.userId,
        category: categoryValidation.data,
        value: body.value,
        date: body.date ? body.date : new Date(),
        description: body.description
      }
    })
    return NextResponse.json(newTransaction, { status: 201 })
  } catch (error) {
    return NextResponse.json("Internal Error", { status: 500 })
  }
}

export async function GET(request: NextRequest) {

}
