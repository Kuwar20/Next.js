import React, { Suspense } from "react";
import Link from "next/link";
import UserData from "./components/UserData";

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
        <Suspense fallback={<p>Loading..</p>}>
          <UserData />
        </Suspense>
      </div>
    </div>
  );
}
