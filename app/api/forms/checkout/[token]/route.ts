import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendCheckoutGuestEmail, sendCheckoutOwnerEmail } from "@/lib/email";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    const property = await prisma.property.findUnique({
      where: { checkOutToken: token },
      include: { user: true },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { guestName, depositReturned, incidentDescription, signatureDataUrl } = body;

    if (guestName === undefined || depositReturned === undefined) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (!signatureDataUrl) {
      return NextResponse.json(
        { error: "Signature is required" },
        { status: 400 }
      );
    }

    const checkOut = await prisma.checkOut.create({
      data: {
        propertyId: property.id,
        guestName,
        depositReturned,
        incidentDescription: incidentDescription || null,
        signatureDataUrl,
      },
    });

    const lastCheckIn = await prisma.checkIn.findFirst({
      where: { propertyId: property.id },
      orderBy: { createdAt: "desc" },
    });

    const today = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    try {
      if (lastCheckIn) {
        await sendCheckoutGuestEmail({
          to: lastCheckIn.guestEmail,
          guestName,
          propertyName: property.name,
          depositReturned,
          incidentDescription,
          checkOutDate: today,
        });
      }

      await sendCheckoutOwnerEmail({
        to: property.user.email,
        ownerName: property.user.name,
        guestName,
        propertyName: property.name,
        depositReturned,
        incidentDescription,
        checkOutDate: today,
      });
    } catch (emailError) {
      console.error("Failed to send checkout emails:", emailError);
    }

    return NextResponse.json({
      success: true,
      checkOut: {
        id: checkOut.id,
        guestName: checkOut.guestName,
      },
    });
  } catch (error) {
    console.error("Error submitting check-out:", error);
    return NextResponse.json(
      { error: "Failed to submit check-out" },
      { status: 500 }
    );
  }
}
