"use client";

import { useEffect, useState } from "react";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [session, setSession] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    getSession().then((data) => {
      if (!data) {
        router.push("/login");
      } else {
        setSession(data);
      }
    });
  }, [router]);

  if (!session) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <h1 className="text-3xl font-bold p-4 rounded-md mb-6 bg-purple-200">
        Hello, welcome to the Sim Link Shortener
      </h1>
      <p className="text-lg">Logged in as: {session.user?.email}</p>
      <Button
        onClick={() => signOut({ callbackUrl: "/login", redirect: true })}
        className="bg-red-600 hover:bg-red-500 text-white"
      >
        Sign Out
      </Button>
    </div>
  );
}
