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
    <header className="bg-white shadow overflow-hidden">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-green-700" onClick={()=>router.push('/admin/')}>FutureFootprints Admin</h1>
        <div className="flex items-center gap-1 md:gap-4">
          <Button variant="ghost" className="text-gray-600 hover:text-gray-900" onClick={() => router.push('/admin/settings')}>
            <Settings className="h-5 w-5 mr-2" />
           <span className="hidden md:flex">Settings</span> 
          </Button>
          <Button variant="ghost" className="text-gray-600 hover:text-gray-900" onClick={() => signOut({ callbackUrl: '/' })}>
            <LogOut className="h-5 w-5 mr-2" />
            <span className="hidden md:flex">Logout</span> 
          </Button>
        </div>
      </div>
    </header>

  )
}

export default Navbar