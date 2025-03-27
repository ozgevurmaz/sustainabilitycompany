"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LayoutDashboard,
  FileText,
  Settings,
  Users,
  LogOut,
  Bell,
  Loader2,
} from "lucide-react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
 
  useEffect(() => {
    if (status !== "loading" && (!session || session.user?.role !== "admin")) {
      router.push("/admin/login");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  const quickStats = [
    { title: "Total Posts", value: "156", change: "+12% from last month" },
    { title: "Active Users", value: "2,854", change: "+18% from last month" },
    { title: "New Comments", value: "43", change: "+5% from last month" },
    { title: "Avg. Response Time", value: "2.4h", change: "-15% from last month" },
  ];

  const navigationCards = [
    {
      title: "Manage Blog",
      description: "Create, edit, and delete blog posts",
      icon: <FileText className="h-6 w-6" />,
      href: "/admin/blog",
    },
    {
      title: "Manage Services",
      description: "Add, update, and remove services",
      icon: <Settings className="h-6 w-6" />,
      href: "/admin/services",
    },
    {
      title: "User Management",
      description: "Manage user roles and permissions",
      icon: <Users className="h-6 w-6" />,
      href: "/admin/users",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
   
      <main className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {navigationCards.map((card, index) => (
            <Link href={card.href} key={index}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    {card.icon}
                    <CardTitle>{card.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>{card.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}