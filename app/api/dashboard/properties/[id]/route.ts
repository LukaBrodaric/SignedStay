import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as any).id;
  const propertyId = params.id;

  const property = await prisma.property.findFirst({
    where: {
      id: propertyId,
      userId,
    },
  });

  if (!property) {
    return NextResponse.json({ error: "Property not found" }, { status: 404 });
  }

  const checkIns = await prisma.checkIn.findMany({
    where: { propertyId },
    orderBy: { createdAt: "desc" },
  });

  const checkOuts = await prisma.checkOut.findMany({
    where: { propertyId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({
    property,
    checkIns,
    checkOuts,
  });
}
