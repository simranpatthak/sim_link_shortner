import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/provider/NextAuthProvider";
import Navbar from "@/components/base/Navbar";
import Footer from "@/components/base/Footer";
import Loader from "@/components/base/Loader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Simlinks - Not just a link shortner  ",
  description:
    "In simlinks , you can short the link and see the logs that who interacted with the link . ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextAuthProvider>
          <Navbar />
          <Loader />
          {children}
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
