export async function GET() {
    // Hardcoded list of names
  // const names = [
  //   { id: 1, title: 'John', price: 10 },
  //   { id: 2, title: 'Jane', price: 20 },
  //   { id: 3, title: 'Alice',  price: 30 },
  //   { id: 4, title: 'Bob' , price: 40 },
  //   { id: 5, title: 'Charlie', price: 50 },
  // ];

  // Initialize an empty array to hold the names
  const names = [];

  // Generate 50 names with incremental IDs and prices
  for (let i = 0; i < 50; i++) {
    names.push({ id: i + 1, title: `Name ${i + 1}`, price: 10 * (i + 1) });
  }

  // Return the names as JSON
  return new Response(JSON.stringify(names), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}