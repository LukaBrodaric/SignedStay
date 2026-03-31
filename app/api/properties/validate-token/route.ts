import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const type = searchParams.get("type");

  if (!token || !type) {
    return NextResponse.json(
      { error: "Token and type are required" },
      { status: 400 }
    );
  }

  let property;

  if (type === "checkin") {
    property = await prisma.property.findFirst({
      where: { checkInToken: token },
      select: {
        id: true,
        name: true,
        depositAmount: true,
      },
    });
  } else if (type === "checkout") {
    property = await prisma.property.findFirst({
      where: { checkOutToken: token },
      select: {
        id: true,
        name: true,
        depositAmount: true,
      },
    });
  }

  if (!property) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 404 }
    );
  }

  return NextResponse.json({ property });
}
