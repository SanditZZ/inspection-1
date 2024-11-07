import { db } from "@/lib/db";
import { CreateInspectionRequest } from "@/services/inspection/types";
import { NextResponse } from "next/server";

// Get all inspections
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const inspectionID = url.searchParams.get("inspectionID");

    let inspection;

    if (inspectionID) {
      inspection = await db.inspection.findMany({
        where: { inspectionID: { contains: inspectionID } },
      });
      if (!inspection) {
        return NextResponse.json({ error: "Inspection not found" }, { status: 404 });
      }
    } else {
      inspection = await db.inspection.findMany();
    }

    return NextResponse.json(inspection, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to fetch inspection", error);

    return NextResponse.json({ error: "Failed to fetch inspection" }, { status: 500 });
  }
}

// Create a new inspection
export async function POST(request: Request) {
  try {
    const reqBody: CreateInspectionRequest = await request.json();

    const inspection = await db.inspection.create({
      data: {
        name: reqBody.name,
        standardID: reqBody.standardID,
        note: reqBody.note ?? "",
        standardName: reqBody.standardName,
        samplingDateTime: reqBody.samplingDateTime,
        samplingPoints: reqBody.samplingPoints ?? [],
        price: reqBody.price,
        imageLink: reqBody.imageLink,
        standardData: reqBody.standardData
          ? JSON.parse(JSON.stringify(reqBody.standardData))
          : null,
      },
    });
    return NextResponse.json(inspection, { status: 201 });
  } catch (error) {
    console.error("Failed to create inspection", error);
    return NextResponse.json({ error: "Failed to create inspection" }, { status: 500 });
  }
}
