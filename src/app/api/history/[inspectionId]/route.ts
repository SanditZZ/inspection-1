import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// Get an inspection by specific id
export async function GET(
  request: NextRequest,
  { params }: { params: { inspectionId: string } },
) {
  const { inspectionId } = params;

  if (!inspectionId) {
    return NextResponse.json({ error: "inspectionID is not found" }, { status: 400 });
  }

  try {
    const inspection = await db.inspection.findUnique({
      where: { inspectionID: inspectionId },
    });

    if (!inspection) {
      return NextResponse.json({ error: "Inspection not found" }, { status: 404 });
    }

    return NextResponse.json(inspection, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to get inspection", error);
    return NextResponse.json({ error: "Failed to get inspection" }, { status: 500 });
  }
}

// Delete an inspection by specific id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { inspectionId: string } },
) {
  const { inspectionId } = params;

  if (!inspectionId) {
    return NextResponse.json({ error: "inspectionID is required" }, { status: 400 });
  }
  try {
    const inspection = await db.inspection.delete({
      where: { inspectionID: inspectionId },
    });

    return NextResponse.json(inspection, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to delete inspection", error);
    return NextResponse.json({ error: "Failed to delete inspection" }, { status: 500 });
  }
}

// Update an inspection by specific id
export async function PATCH(
  request: NextRequest,
  { params }: { params: { inspectionId: string } },
) {
  const { inspectionId } = params;

  if (!inspectionId) {
    return NextResponse.json({ error: "inspectionID is required" }, { status: 400 });
  }

  try {
    const inspection = await db.inspection.update({
      where: { inspectionID: inspectionId },
      data: await request.json(),
    });

    return NextResponse.json(inspection, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to update inspection", error);
    return NextResponse.json({ error: "Failed to update inspection" }, { status: 500 });
  }
}
