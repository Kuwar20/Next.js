import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  let tasks;
  try {
    tasks = await sql`SELECT * FROM tasks;`;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ tasks }, { status: 200 });
}