import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div>
        <Link
          href="/dashboard"
          className="border rounded-lg m-3 p-3 bg-blue-600 hover:bg-blue-400 text-white"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}
