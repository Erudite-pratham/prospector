"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getMyProfile, UserProfile } from "@/lib/api/user.api";
import { logout } from "@/lib/api/auth.api";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { LogOut } from "lucide-react";

export function Navbar() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    getMyProfile()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  async function handleLogout() {
    try {
      await logout();
      window.location.href = "/login"; // hard redirect to clear state
    } catch (err) {
      console.error("Logout failed", err);
    }
  }

  return (
    <header className="border-b sticky top-0 z-50 bg-background">
      <nav className="mx-auto h-16 max-w-7xl flex justify-between items-center px-4">
        {/* Logo */}
        <Link href="/">
          <Image src="/logo.svg" alt="Prospector Logo" width={64} height={64} />
        </Link>
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-medium">
                {user.name.charAt(0)}
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="space-y-1">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-600 focus:text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </nav>
    </header>
  );
}
