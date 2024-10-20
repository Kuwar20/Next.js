import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  const { id } = await request.json();

  try {
    if (!id) throw new Error("ID is required");
    await sql`DELETE FROM tasks WHERE id = ${id};`;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
}