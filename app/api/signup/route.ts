import { prisma } from "../../../prisma/client"
import { NextRequest, NextResponse } from "next/server";
import { signupSchema } from "../zodSchema";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = signupSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error, { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: { email: body.email }
  })

  if (user) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 })
  }

  const hashPassword = await bcrypt.hash(body.password, 10);

  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: hashPassword
    }
  })

  return NextResponse.json(newUser, { status: 201 })
}