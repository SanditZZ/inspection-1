import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const standards = await db.standard.findMany();
    return NextResponse.json(standards, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to fetch standards", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch standards" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
