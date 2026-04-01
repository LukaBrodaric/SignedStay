import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendCheckInConfirmation } from "@/lib/email";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    const property = await prisma.property.findFirst({
      where: { checkInToken: token },
      include: {
        documents: true,
      },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const {
      guestName,
      guestEmail,
      arrivalDate,
      departureDate,
      estimatedDepartureHour,
      numberOfGuests,
      depositConfirmed,
      conditionConfirmed,
      signatureDataUrl,
    } = body;

    if (
      !guestName ||
      !guestEmail ||
      !arrivalDate ||
      !departureDate ||
      !numberOfGuests ||
      !estimatedDepartureHour ||
      depositConfirmed === undefined ||
      conditionConfirmed === undefined ||
      !signatureDataUrl
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const checkIn = await prisma.checkIn.create({
      data: {
        propertyId: property.id,
        guestName,
        guestEmail,
        arrivalDate: new Date(arrivalDate),
        departureDate: new Date(departureDate),
        estimatedDepartureHour,
        numberOfGuests: parseInt(numberOfGuests),
        depositConfirmed,
        conditionConfirmed,
        signatureDataUrl,
      },
    });

    try {
      await sendCheckInConfirmation(
        guestEmail,
        guestName,
        property.name,
        {
          guestName,
          guestEmail,
          arrivalDate: new Date(arrivalDate),
          departureDate: new Date(departureDate),
          numberOfGuests: parseInt(numberOfGuests),
        },
        property.documents
      );
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
    }

    return NextResponse.json({
      success: true,
      checkIn: {
        id: checkIn.id,
        guestName: checkIn.guestName,
        arrivalDate: checkIn.arrivalDate,
        departureDate: checkIn.departureDate,
        numberOfGuests: checkIn.numberOfGuests,
      },
    });
  } catch (error) {
    console.error("Error submitting check-in:", error);
    return NextResponse.json(
      { error: "Failed to submit check-in" },
      { status: 500 }
    );
  }
}
