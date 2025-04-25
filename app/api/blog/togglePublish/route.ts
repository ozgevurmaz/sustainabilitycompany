import { connectToDB } from "@/lib/MongoDB";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { blogSlug: string } }) {
    await connectToDB();
  
    try {
      const {slug, status} = await req.json();
  
      const updatedBlog = await Blog.findOneAndUpdate(
        { slug }, 
        { $set: { status } },
        { new: true }
      );
  
      if (!updatedBlog) {
        return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
      }
  
      return NextResponse.json(updatedBlog, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: "Error updating blog" }, { status: 500 });
    }
  }