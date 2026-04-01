import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const properties = await prisma.property.findMany({
    include: {
      user: {
        select: { name: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(properties);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const { name, address, userId, depositAmount } = await request.json();

    if (!name || !userId) {
      return NextResponse.json(
        { error: "Name and user are required" },
        { status: 400 }
      );
    }

    const property = await prisma.property.create({
      data: {
        name,
        address,
        userId,
        depositAmount: depositAmount || 600,
      },
    });

    revalidatePath("/admin/properties");

    return NextResponse.json(property);
  } catch (error) {
    console.error("Error creating property:", error);
    return NextResponse.json(
      { error: "Failed to create property" },
      { status: 500 }
    );
  }
}
