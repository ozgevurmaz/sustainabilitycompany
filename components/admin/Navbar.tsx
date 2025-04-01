"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Settings,
  LogOut,
} from "lucide-react";

const Navbar = () => {
  const router = useRouter();

  return (
<header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-green-700">Sustainability Admin</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900" onClick={() => router.push('/admin/settings')}>
              <Settings className="h-5 w-5 mr-2" />
              Settings
            </Button>
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900" onClick={() => signOut({ callbackUrl: '/' })}>
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

  )
}

export default Navbar