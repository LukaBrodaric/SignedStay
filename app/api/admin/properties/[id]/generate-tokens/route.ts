import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const propertyId = params.id;

    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      select: { name: true },
    });

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    const slug = property.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .substring(0, 20);

    const uuidPart = crypto.randomUUID().substring(0, 8);
    const checkInToken = `${slug}-checkin-${uuidPart}`;
    const checkOutToken = `${slug}-checkout-${uuidPart}`;

    const updatedProperty = await prisma.property.update({
      where: { id: propertyId },
      data: {
        checkInToken,
        checkOutToken,
      },
    });

    return NextResponse.json(updatedProperty);
  } catch (error) {
    console.error("Error generating tokens:", error);
    return NextResponse.json(
      { error: "Failed to generate tokens" },
      { status: 500 }
    );
  }
}
