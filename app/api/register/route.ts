import { prisma } from "../../../prisma/client"
import { NextRequest, NextResponse } from "next/server";
import { registerBodySchema, categorySchema } from "../zodSchema";

interface registerBody {
  userId: string;
  category: string;
  value: number;
  description?: string;
  date?: string;
}

export async function POST(request: NextRequest) {
  const body: registerBody = await request.json();
  const bodyValidation = registerBodySchema.safeParse(body)
  const categoryValidation = categorySchema.safeParse(body.category);

  if (!bodyValidation.success) {
    return NextResponse.json(bodyValidation.error, { status: 400 })
  }
  if (!categoryValidation.success) {
    return NextResponse.json(bodyValidation.error, { status: 400 })
  }
  try {
    const newRegister = await prisma.register.create({
      data: {
        userId: body.userId,
        category: categoryValidation.data,
        value: body.value,
        date: body.date ? body.date : new Date(),
        description: body.description
      }
    })
    return NextResponse.json(newRegister, { status: 201 })
  } catch (error) {
    return NextResponse.json("Internal Error", { status: 500 })
  }
}

export async function GET(request: NextRequest) {

}
