"use client";

import { SyntheticEvent, useEffect, useState } from "react";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Copy } from "lucide-react";

export default function Dashboard() {
  const [session, setSession] = useState<any>(undefined);
  const [originalLink, setOriginalLink] = useState("");
  const [shortenedLink, setShortenedLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  const shortenLink = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!originalLink || !session?.user?.id) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/links", {
        userId: session.user.id,
        url: originalLink,
      });

      setShortenedLink(response.data.data.shortUrl);
    } catch (error: any) {
      console.error("API Error:", error);
      setError(error.response?.data?.errors?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (shortenedLink) {
      navigator.clipboard.writeText(shortenedLink);
      alert("Shortened link copied!");
    }
  };

  if (session === undefined) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-4xl font-bold text-purple-600 mb-4">
        Welcome, {session?.user?.name || "User"}!
      </h1>
      <p className="text-lg text-gray-700 mb-6">Your personal URL shortener dashboard</p>

      <div className="text-left bg-white p-4 rounded-md shadow-md mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">How to use:</h2>
        <ul className="list-disc list-inside text-gray-600">
          <li>Click the <strong>"Shorten a Link"</strong> button.</li>
          <li>Paste your URL in the input box.</li>
          <li>Click <strong>"Generate Short Link"</strong> and copy the result.</li>
          <li>Use your new short URL anywhere you like!</li>
          <li>Check your generated links in the <strong>Logs</strong> section.</li>
        </ul>
      </div>

      <div className="flex gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-500 text-white">
              Shorten a Link
            </Button>
          </DialogTrigger>
          <DialogContent className="p-6 text-center">
            <DialogTitle>Enter your URL</DialogTitle>
            <DialogDescription>Paste the link below to generate a short version.</DialogDescription>

            <Input
              type="url"
              placeholder="Paste your link here"
              value={originalLink}
              onChange={(e) => setOriginalLink(e.target.value)}
              className="mt-4"
            />

            <Button 
              onClick={shortenLink} 
              className="mt-4 bg-green-600 hover:bg-green-500 text-white"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Short Link"}
            </Button>

            {error && <p className="mt-2 text-red-600">{error}</p>}

            {shortenedLink && (
              <div className="mt-4 flex items-center gap-3 bg-gray-200 p-2 rounded-md">
                <span className="text-sm font-medium text-gray-700">{shortenedLink}</span>
                <Button onClick={copyToClipboard} className="p-1 bg-gray-300 hover:bg-gray-400">
                  <Copy size={16} />
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <Button onClick={() => router.push("/logs")} className="bg-gray-800 hover:bg-gray-700 text-white">
          View Logs
        </Button>
      </div>

      <div className="mt-10 text-center">
        <p className="text-gray-600">Logged in as: <span className="font-semibold">{session?.user?.email}</span></p>
        <Button
          onClick={() => signOut({ callbackUrl: "/login", redirect: true })}
          className="mt-4 bg-red-600 hover:bg-red-500 text-white"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}
