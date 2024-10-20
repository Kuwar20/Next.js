import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { taskName } = await request.json();

  try {
    if (!taskName) throw new Error("Task name is required");

    await sql`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL
      );
    `;

    await sql`INSERT INTO tasks (name) VALUES (${taskName});`;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Task added successfully" }, { status: 201 });
}