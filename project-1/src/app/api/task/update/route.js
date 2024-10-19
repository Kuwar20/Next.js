import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function PUT(request) {
  const { id, petName, petAge } = await request.json();

  try {
    if (!id || !petName || !petAge) throw new Error("ID, pet name, and age are required");
    await sql`UPDATE pets SET name = ${petName}, age = ${petAge} WHERE id = ${id};`;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Pet updated successfully" }, { status: 200 });
}