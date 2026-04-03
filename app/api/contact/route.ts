import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";

// Test endpoint - returns success without sending email
export async function GET() {
  return NextResponse.json({ 
    status: "ok", 
    message: "Contact API is working",
    resendConfigured: !(!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "re_xxxxxxxxxxxx")
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "re_xxxxxxxxxxxx") {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    await sendContactEmail({
      name,
      email,
      subject,
      message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending contact email:", error);
    return NextResponse.json(
      { error: "Failed to send message", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
