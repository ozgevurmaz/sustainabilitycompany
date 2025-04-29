import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/MongoDB";
import Blog from "@/models/blog";
import Categories from "@/models/categories";
import Activity from "@/models/activity";

// Create a new blog post
export async function POST(req: Request) {
  await connectToDB();

  try {

    const data = await req.json();
    const { title, slug, excerpt, content, categories, tags, featuredImage, status, metaTitle, metaDescription, isPublished, publishDate, publishTime, readTime, views
    } = data;

    if (!title || !slug || !excerpt || !content || !featuredImage || !categories || !status) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    for (const categoryId of categories) {
      const cat = await Categories.findById(categoryId);
      if (cat) {
        await Categories.findByIdAndUpdate(categoryId, { $inc: { postCount: 1 } });
      }
    }

    const newBlog = await Blog.create({ title, slug, excerpt, content, categories, tags, featuredImage, status, metaTitle, metaDescription, isPublished, publishDate, publishTime, readTime, views });
    await Activity.create({
      type: "blog",
      action: "created",
      message: `Blog post created: "${title}", status:"${status}`,
      timestamp: new Date(),
    });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating blog" }, { status: 500 });
  }
}

// Get all blogs
export async function GET() {
  await connectToDB();

  try {
    const blogs = await Blog.find({})
      .sort({ updatedAt: -1 });
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching blogs" }, { status: 500 });
  }
}
