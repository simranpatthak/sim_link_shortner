"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function Home() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col justify-center px-6 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-10 py-8">
        <motion.div 
          className="max-w-lg text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to <b className="text-violet-900">SimLink</b></h1>
          <p className="text-lg mb-6">
            The ultimate link shortener that not only shortens your URLs but also provides powerful analytics,
            encryption, and complete control over your links. Simplify, secure, and track your links effortlessly.
          </p>
          <Button
            className="relative px-6 py-3 bg-violet-900 hover:bg-violet-700 text-lg rounded-lg font-medium overflow-hidden text-white shadow-md"
            onClick={() => router.push("/dashboard")}
          >
            <span className="absolute bg-violet-900 hover:bg-violet-700"></span>
            <span className="relative z-10">Generate Link Now</span>
          </Button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <Image 
            src="/landing.svg" 
            alt="Link Shortening Illustration" 
            width={600} 
            height={400} 
           
          />
        </motion.div>
      </div>
<div>
        <h1 className="text-2xl md:text-4xl text-center font-bold mb-2">Why Simlinks ?</h1>

      <div className="mt-8 grid md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
        {["Track Clicks", "Secure & Encrypted", "Manage Links"].map((title, i) => (
          <Card key={i} className="bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 p-6 text-center">
            <CardContent>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {title === "Track Clicks" ? "Monitor your links in real-time." : 
                 title === "Secure & Encrypted" ? "Ensure maximum privacy and control." : 
                 "Modify your links with ease."}
              </p>
            </CardContent>
          </Card>
        ))}
</div>
</div>
    </div>
  );
}
