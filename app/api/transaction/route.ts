import { prisma } from "../../../prisma/client"
import { NextRequest, NextResponse } from "next/server";
import { transactionBodySchema, categorySchema } from "../zodSchema";
import { auth } from "../auth/[...nextauth]/route"

interface transactionBody {
  userId: string;
  category: string;
  value: number;
  description?: string;
  date?: string;
}

export async function POST(request: NextRequest) {
  const session = await auth()
  console.log(session)
  if (!session
    || session.user == undefined
    || session.user.id == undefined
    || typeof session.user == "string") {
    return NextResponse.json("Internal Error sem session.user", { status: 500 })
  }

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
        userId: session.user.id,
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
  const session = await auth()
  if (!session || session.user == undefined) {
    return NextResponse.json("Internal Error sem session.user", { status: 500 })
  }

  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId: session.user.id }
    })
    return NextResponse.json(transactions, { status: 200 })
  } catch (error) {
    return NextResponse.json("Internal Error erro no prisma", { status: 500 })
  }

}
