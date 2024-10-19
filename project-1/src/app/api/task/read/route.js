// import { sql } from "@vercel/postgres";
// import { NextResponse } from "next/server";

// export async function GET() {
//   let pets;
//   try {
//     pets = await sql`SELECT * FROM pets;`;
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }

//   return NextResponse.json({ pets }, { status: 200 });
// }

import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const petName = searchParams.get("petName");

  let pets;
  try {
    if (petName) {
      pets = await sql`SELECT * FROM pets WHERE name = ${petName};`;
    } else {
      pets = await sql`SELECT * FROM pets;`;
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ pets }, { status: 200 });
}