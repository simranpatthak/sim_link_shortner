"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white px-6">
      <motion.h1 
        className="text-4xl md:text-6xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to Sim-Link
      </motion.h1>
      
      <motion.p 
        className="text-lg text-center max-w-2xl mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        The ultimate link shortener that not only shortens your URLs but also provides powerful analytics,
        encryption, and complete control over your links. Simplify, secure, and track your links effortlessly.
      </motion.p>
      
      <Button
        className="bg-blue-500 hover:bg-blue-600 px-6 py-3 text-lg rounded-lg font-medium"
        onClick={() => router.push("/dashboard")}
      >
        Generate Link Now
      </Button>
      
      <motion.div 
        className="mt-12"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <Image 
          src="/landing.jpg" 
          alt="Link Shortening Illustration" 
          width={600} 
          height={400} 
          className="rounded-lg shadow-lg"
        />
      </motion.div>
      
      <div className="mt-16 grid md:grid-cols-3 gap-6 w-full max-w-6xl">
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Track Clicks</h3>
            <p className="text-gray-300">Monitor how many users clicked on your shortened links in real-time.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Secure & Encrypted</h3>
            <p className="text-gray-300">Generate encrypted links to ensure maximum privacy and control.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Manage Links</h3>
            <p className="text-gray-300">Dispose of or modify your links whenever you want with ease.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
