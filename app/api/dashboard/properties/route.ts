import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as any).id;

  const properties = await prisma.property.findMany({
    where: { userId },
    select: {
      id: true,
      name: true,
      address: true,
      checkInToken: true,
      checkOutToken: true,
      _count: {
        select: {
          checkIns: true,
          checkOuts: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(properties);
}
