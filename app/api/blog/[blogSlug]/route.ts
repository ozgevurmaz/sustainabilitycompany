import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/MongoDB";
import Blog from "@/models/blog";
import Categories from "@/models/categories";
import Activity from "@/models/activity";

type Params = {
  params: {
    blogSlug: string;
  };
};

// Get a single blog post by Slug
export async function GET(req: NextRequest, context: { params: { blogSlug: string } }) {
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

// Update a blog post by Slug
export async function PUT(req: NextRequest, context: { params: { blogSlug: string } }) {
  await connectToDB();
  const { blogSlug } = context.params;
  try {
    const data = await req.json();

    const existingBlog = await Blog.findOne({ slug: blogSlug });
    if (!existingBlog) {
      return NextResponse.json({ error: "Original blog not found" }, { status: 404 });
    }

    const updatedBlog = await Blog.findOneAndUpdate(
      { slug: blogSlug },
      data,
      { new: true }
    );

    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog post not found after update" }, { status: 404 });
    }

    const oldCategories = existingBlog.categories.map((id: string) => id.toString());
    const newCategories = updatedBlog.categories.map((id: string) => id.toString());

    const removedCategories = oldCategories.filter((id: string) => !newCategories.includes(id));
    const addedCategories = newCategories.filter((id: string) => !oldCategories.includes(id));

    for (const id of removedCategories) {
      await Categories.findByIdAndUpdate(id, { $inc: { postCount: -1 } });
    }

    for (const id of addedCategories) {
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
    console.error("Error updating blog:", error);
    return NextResponse.json({ error: "Error updating blog" }, { status: 500 });
  }
}


// Delete a blog post by Slug
export async function DELETE(req: NextRequest, context: { params: { blogSlug: string } }) {
  await connectToDB();
  const { blogSlug } = context.params;

  try {
    const deletedBlog = await Blog.findOne({ slug: blogSlug });

    if (!deletedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const title = deletedBlog.title;

    for (const categoryId of deletedBlog.categories) {
      const cat = await Categories.findById(categoryId);
      if (cat && cat.postCount && cat.postCount <= 0) {
        await Categories.findByIdAndUpdate(categoryId, { $set: { postCount: 0 } });
      }
    }

    await Blog.deleteOne({ _id: deletedBlog._id });
    await Activity.create({
      type: "blog",
      action: "deleted",
      message: `A blog post deleted: "${title}"`,
      timestamp: new Date(),
    });

    return NextResponse.json({ message: "Blog deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting Blog" }, { status: 500 });
  }
}