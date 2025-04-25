import { connectToDB } from "@/lib/MongoDB";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function GET() {
    await connectToDB();
  
    try {
      const blogs = await Blog.find({ status: "published" })
        .sort({ updatedAt: -1 });
      return NextResponse.json(blogs, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Error fetching blogs" }, { status: 500 });
    }
  }