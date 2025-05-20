"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "./Navbar";
import AdminFooter from "./Footer";
import { Toaster } from "../ui/toaster";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SessionProvider>
      <ProtectedAdmin>
        <Navbar />
        <Toaster />
        {children}
        <AdminFooter />
      </ProtectedAdmin>
    </SessionProvider>
  );
}

function ProtectedAdmin({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user?.role !== "admin") {
      router.push("/admin/login");
    }
  }, [session, status, router]);

  if (status === "loading") return <p>Loading...</p>;

  return <div>{children}</div>;
}
