import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { petName, petAge } = await request.json();

  try {
    if (!petName || !petAge) throw new Error("Pet name and age are required");

    // Ensure the table exists
    await sql`
      CREATE TABLE IF NOT EXISTS pets (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        age INT NOT NULL
      );
    `;

    // Insert a pet
    await sql`INSERT INTO pets (name, age) VALUES (${petName}, ${petAge});`;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Pet added successfully" }, { status: 201 });
}