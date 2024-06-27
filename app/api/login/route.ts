import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "../schema";
import bcrypt from "bcrypt";


export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = loginSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error, { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: { email: body.email }
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const passwordCheck = await bcrypt.compare(body.password, user.password);


  return NextResponse.json({ status: 200 })
}