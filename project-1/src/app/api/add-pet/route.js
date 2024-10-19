// import { db } from "@vercel/postgres";
// import { NextResponse } from "next/server";

// // http://localhost:3000/api/add-pet

// export async function GET(request) {
//     const client = await db.connect();

//     try {
//         // Ensure the table exists
//         await client.sql`CREATE TABLE IF NOT EXISTS pets (id SERIAL PRIMARY KEY, name TEXT, age INT)`;
        
//         // Insert a pet
//         await client.sql`INSERT INTO pets (name, age) VALUES ('Fluffy', 2)`;
        
//         // Fetch all pets
//         const pets = await client.sql`SELECT * FROM pets`;
        
//         // Return the pets
//         return NextResponse.json({ pets });
//     } catch (err) {
//         // Handle errors
//         return NextResponse.json({ error: err.message }, { status: 500 });
//     } 
// }


import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

// http://localhost:3000/api/add-pet?petName=Fluffy&petAge=2
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const petName = searchParams.get("petName");
  const petAge = searchParams.get("petAge");

  try {
    if (!petName || !petAge) throw new Error("Pet and owner names required");
    await sql`INSERT INTO pets (name, age) VALUES (${petName}, ${petAge});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const pets = await sql`SELECT * FROM pets;`;
  return NextResponse.json({ pets }, { status: 200 });
}
