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
  const [session, setSession] = useState<any>(null);
  const [originalLink, setOriginalLink] = useState("");
  const [shortenedLink, setShortenedLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch session & user details
  useEffect(() => {
    getSession().then((data) => {
      if (!data) {
        router.push("/login");
      } else {
        setSession(data);
      }
    });
  }, [router]);
console.log(session);

  const shortenLink = async (e:SyntheticEvent) => {
    e.preventDefault()
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

  // Copy to clipboard function
  const copyToClipboard = () => {
    if (shortenedLink) {
      navigator.clipboard.writeText(shortenedLink);
      alert("Shortened link copied!");
    }
  };

  if (!session) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-4xl font-bold text-purple-600 mb-4">Sim Link Shortener</h1>
      <p className="text-lg text-gray-700 mb-8">Shorten your link in one click!</p>

      <div className="flex gap-4">
        {/* Shorten Link Modal */}
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

            {/* Show API Errors */}
            {error && <p className="mt-2 text-red-600">{error}</p>}

            {/* Display the shortened link */}
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

        {/* Logs Button */}
        <Button onClick={() => router.push("/logs")} className="bg-gray-800 hover:bg-gray-700 text-white">
          View Logs
        </Button>
      </div>

      <div className="mt-10 text-center">
        <p className="text-gray-600">Logged in as: <span className="font-semibold">{session.user?.email}</span></p>
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
