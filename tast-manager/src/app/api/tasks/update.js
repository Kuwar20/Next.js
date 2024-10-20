import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function PUT(request) {
  const { id, taskName } = await request.json();

  try {
    if (!id || !taskName) throw new Error("ID and task name are required");
    await sql`UPDATE tasks SET name = ${taskName} WHERE id = ${id};`;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Task updated successfully" }, { status: 200 });
}