import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_DOCS_PER_PROPERTY = 3;

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const propertyId = params.id;

    const existingDocs = await prisma.propertyDocument.count({
      where: { propertyId },
    });

    if (existingDocs >= MAX_DOCS_PER_PROPERTY) {
      return NextResponse.json(
        { error: `Maximum ${MAX_DOCS_PER_PROPERTY} documents per property` },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const name = formData.get("name") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!name) {
      return NextResponse.json({ error: "Document name required" }, { status: 400 });
    }

    // Only allow PDF files
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
        { status: 400 }
      );
    }

    const ext = "pdf"; // Always use .pdf
    const originalName = file.name.replace(/\.[^/.]+$/, ""); // Remove extension for display
    const fileNameForDb = `${originalName.replace(/[^a-zA-Z0-9]/g, "-")}-${Date.now()}.${ext}`;

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File too large. Max ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = join(process.cwd(), "public", "uploads", "documents", propertyId);
    await mkdir(uploadDir, { recursive: true });

    const fileName = fileNameForDb;
    const filePath = join(uploadDir, fileName);

    await writeFile(filePath, buffer);

    const document = await prisma.propertyDocument.create({
      data: {
        propertyId,
        name,
        fileName: fileName,
        filePath: `/uploads/documents/${propertyId}/${fileName}`,
        fileSize: file.size,
        mimeType: file.type,
      },
    });

    return NextResponse.json(document);
  } catch (error) {
    console.error("Error uploading document:", error);
    return NextResponse.json(
      { error: "Failed to upload document" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const propertyId = params.id;

    const documents = await prisma.propertyDocument.findMany({
      where: { propertyId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(documents);
  } catch (error) {
    console.error("Error fetching documents:", error);
    return NextResponse.json(
      { error: "Failed to fetch documents" },
      { status: 500 }
    );
  }
}