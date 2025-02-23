"use client";

import { useEffect, useState } from "react";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Session } from "next-auth";


interface UserSession extends Session {
    user?: {
      name?: string;
      email?: string;
      image?: string;
    };
  }

  
export default function Navbar() {
  const [session, setSession] = useState<UserSession | null>(null);
  const { setTheme, theme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    getSession().then((data:any) => setSession(data));
  }, []);

  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white dark:bg-gray-900">
      <div className="flex gap-6">
        <Link href="/" className="text-lg font-semibold">Home</Link>
        <Link href="/dashboard" className="text-lg font-semibold">Dashboard</Link>
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={session.user?.image || "https://via.placeholder.com/40"} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="px-4 py-2">
                <p className="font-medium">{session.user?.name}</p>
                <p className="text-xs text-muted-foreground">{session.user?.email}</p>
              </div>
              <DropdownMenuItem
                onClick={() => signOut({ callbackUrl: "/login", redirect: true })}
                className="text-red-500 cursor-pointer"
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => router.push("/login")} variant="outline">
            Login
          </Button>
        )}
      </div>
    </nav>
  );
}
