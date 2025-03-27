"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const dummyBlogs = [
  { id: 1, title: "Understanding Carbon Footprint", slug: "carbon-footprint" },
  { id: 2, title: "Water Conservation Tips", slug: "water-conservation" },
];

export default function BlogAdmin() {
  const [blogs, setBlogs] = useState(dummyBlogs);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Manage Blogs</h1>

        <Link href="/admin/blog/new">
          <Button className="mb-6">Add New Blog</Button>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs && blogs.map((blog) => (
            <Card key={blog.id}>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold">{blog.title}</h2>
                <div className="flex justify-between mt-4">
                  <Link href={`/admin/blog/edit/${blog.id}`}>
                    <Button variant="outline">Edit</Button>
                  </Link>
                  <Button variant="destructive" onClick={() => setBlogs(blogs.filter(b => b.id !== blog.id))}>
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
