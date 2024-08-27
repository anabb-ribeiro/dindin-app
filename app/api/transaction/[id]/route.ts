import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { transactionBodySchema, categorySchema } from "../../zodSchema";
import { verifySession } from "../route";

interface transactionUpdateBody {
  userId: string;
  category: string;
  value?: number;
  description?: string;
  date?: string;
}

interface Params {
  params: { id: string }
}

export async function PATCH(req: NextRequest, { params: { id } }: Params) {
  const session = await verifySession()

  if (!session) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
  }

  if (!id || typeof id !== "string") {
    return NextResponse.json({ message: "Bad Request" }, { status: 400 })
  }

  const body: transactionUpdateBody = await req.json();
  const bodyValidation = transactionBodySchema.safeParse(body)

  let categoryData = null;
  if (body.category) {
    const categoryValidation = categorySchema.safeParse(body.category);
    if (!categoryValidation.success) {
      return NextResponse.json(bodyValidation.error, { status: 400 })
    }
    categoryData = categoryValidation.data;
  }

  if (!bodyValidation.success) {
    return NextResponse.json(bodyValidation.error, { status: 400 })
  }

  try {
    const data = Object.fromEntries(
      Object.entries(body).filter(([_, value]) => value !== undefined && value !== null)
    );

    data.userId = session.user!.id;
    if (categoryData) data.category = categoryData;

    const newTransaction = await prisma.transaction.update({
      where: { id },
      data
    })
    return NextResponse.json(newTransaction, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "Internal Error" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params: { id } }: Params) {
  console.log(id)
  if (!id || typeof id !== "string") {
    return NextResponse.json({ message: "Bad Request" }, { status: 400 })
  }

  try {
    await prisma.transaction.delete({
      where: { id }
    })
    return NextResponse.json({ message: "Deleted" }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Internal Error" }, { status: 500 })
  }
}