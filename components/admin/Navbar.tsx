"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FileText,
  Settings,
  Users,
  LogOut,
  Bell,
  Loader2,
} from "lucide-react";
import { useState } from "react";

const Navbar = () => {
    const [notifications, setNotifications] = useState(3); // Example notification count

  return (
    <header className="bg-white border-b border-gray-200">
    <div className="container mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        <Link href="/admin "className="flex items-center space-x-4">
          <LayoutDashboard className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        </Link>

        <div className="flex items-center space-x-4">
        <Link href="/admin/blog" className="rounded-md h-9 px-4 py-2 hover:bg-accent hover:text-accent-foreground">Blogs</Link>
        <Link href="/admin/services" className="rounded-md h-9 px-4 py-2 hover:bg-accent hover:text-accent-foreground" >Services</Link>
          <Button variant="ghost" className="relative">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                {notifications}
              </span>
            )}
          </Button>
          <Button
            variant="destructive"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center space-x-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </div>
  </header>

  )
}

export default Navbar