import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/MongoDB";
import Blog from "@/models/blog";

// Create a new blog post
export async function POST(req: Request) {
  await connectToDB();

  try {
    const { title, content, coverImage } = await req.json();

    if (!title || !content || !coverImage) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const slug = title.toLowerCase().replace(/ /g, "-"); // Generate slug from title

    const newBlog = await Blog.create({ title, content, coverImage, slug });
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating blog" }, { status: 500 });
  }
}

// Get all blogs
export async function GET() {
  await connectToDB();

  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching blogs" }, { status: 500 });
  }
}
