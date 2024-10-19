import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  let databases;
  try {
    databases = await sql`SELECT datname FROM pg_database WHERE datistemplate = false;`;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ databases }, { status: 200 });
}