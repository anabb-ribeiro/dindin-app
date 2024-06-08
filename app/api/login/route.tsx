import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "../schema";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = loginSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error, { status: 400 })
  }


  return NextResponse.json({ status: 200 })
}