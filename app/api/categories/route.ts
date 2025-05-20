import { connectToDB } from "@/lib/MongoDB";
import Activity from "@/models/activity";
import Categories from "@/models/categories";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    const categories = await Categories.find().sort({ createdAt: -1 });
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Error fetching categories" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDB();

    const { name } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Category name is required." }, { status: 400 });
    }

    const existing = await Categories.findOne({ name });

    if (existing) {
      return NextResponse.json({ error: "Category already exists." }, { status: 409 });
    }

    const category = await Categories.create({ name, postCount: 0 });

    await Activity.create({
      type: "category",
      action: "added",
      message: `A category added: "${category.name}"`,
      timestamp: new Date(),
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json({ error: "Failed to create category." }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectToDB();

    const { id, postCount } = await req.json();

    if (!id || postCount === undefined) {
      return NextResponse.json({ error: "ID and postCount are required." }, { status: 400 });
    }

    const category = await Categories.findByIdAndUpdate(
      id,
      { $set: { postCount } },
      { new: true }
    );

    if (!category) {
      return NextResponse.json({ error: "Category not found." }, { status: 404 });
    }

    await Activity.create({
      type: "category",
      action: "updated",
      message: `A category updated: "${category.name}"`,
      timestamp: new Date(),
    });

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.error("Error updating category count:", error);
    return NextResponse.json({ error: "Failed to update category." }, { status: 500 });
  }
}