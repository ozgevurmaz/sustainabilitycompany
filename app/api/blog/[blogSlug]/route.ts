import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/MongoDB";
import Blog from "@/models/blog";
import Categories from "@/models/categories";
import Activity from "@/models/activity";

export async function GET(req: NextRequest, context: any) {
  await connectToDB();
  const { blogSlug } = context.params;

  try {
    const blog = await Blog.findOne({ slug: blogSlug });

    if (!blog) {
      return NextResponse.json({ error: "Blog Post not found" }, { status: 404 });
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching Blog" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: any) {
  await connectToDB();
  const { blogSlug } = context.params;

  try {
    const data = await req.json();

    const existingBlog = await Blog.findOne({ slug: blogSlug });
    if (!existingBlog) {
      return NextResponse.json({ error: "Original blog not found" }, { status: 404 });
    }

    const updatedBlog = await Blog.findOneAndUpdate({ slug: blogSlug }, data, { new: true });

    const oldCategories = existingBlog.categories.map((id: string) => id.toString());
    const newCategories = updatedBlog.categories.map((id: string) => id.toString());

    const removed = oldCategories.filter((id: string) => !newCategories.includes(id));
    const added = newCategories.filter((id: string) => !oldCategories.includes(id));

    for (const id of removed) {
      await Categories.findByIdAndUpdate(id, { $inc: { postCount: -1 } });
    }

    for (const id of added) {
      await Categories.findByIdAndUpdate(id, { $inc: { postCount: 1 } });
    }

    await Activity.create({
      type: "blog",
      action: "edited",
      message: `Blog post edited: "${updatedBlog.title}", status: ${updatedBlog.status}`,
      timestamp: new Date(),
    });

    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error updating blog" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: any) {
  await connectToDB();
  const { blogSlug } = context.params;

  try {
    const deletedBlog = await Blog.findOne({ slug: blogSlug });

    if (!deletedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    await Blog.deleteOne({ _id: deletedBlog._id });

    await Activity.create({
      type: "blog",
      action: "deleted",
      message: `A blog post deleted: "${deletedBlog.title}"`,
      timestamp: new Date(),
    });

    for (const id of deletedBlog.categories) {
      await Categories.findByIdAndUpdate(id, { $inc: { postCount: -1 } });
    }

    return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting blog" }, { status: 500 });
  }
}
