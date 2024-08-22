import { prisma } from "../../../prisma/client"
import { NextRequest, NextResponse } from "next/server";
import { transactionBodySchema, categorySchema, transactionUpdateBodySchema } from "../zodSchema";
import { auth } from "../auth/[...nextauth]/route"

interface transactionBody {
  userId: string;
  category: string;
  value: number;
  description?: string;
  date?: string;
}

export async function verifySession() {
  const session = await auth()

  if (!session
    || !session.user
    || !session.user.id
    || typeof session.user.id !== "string") {
    return null;
  }
  return session
}

export async function POST(request: NextRequest) {
  const session = await verifySession()
  const body: transactionBody = await request.json();
  const bodyValidation = transactionBodySchema.safeParse(body)
  const categoryValidation = categorySchema.safeParse(body.category);

  if (!session) {
    return NextResponse.json("Internal Error sem session.user", { status: 500 })
  }

  if (!bodyValidation.success) {
    return NextResponse.json(bodyValidation.error, { status: 400 })
  }
  if (!categoryValidation.success) {
    return NextResponse.json(bodyValidation.error, { status: 400 })
  }
  try {
    const newTransaction = await prisma.transaction.create({
      data: {
        userId: session.user!.id!,
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

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await verifySession()

  if (!session) {
    return NextResponse.json("Internal Error sem session.user", { status: 500 })
  }

  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId: session.user!.id }
    })
    return NextResponse.json(transactions, { status: 200 })
  } catch (error) {
    return NextResponse.json("Internal Error erro no prisma", { status: 500 })
  }

}

