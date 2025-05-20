import { connectToDB } from "@/lib/MongoDB";
import Activity from "@/models/activity";
import Blog from "@/models/blog";
import Categories from "@/models/categories";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, context: any) {
    await connectToDB();
    const { categoryId } = context.params;

    try {
        const category = await Categories.findOne({ _id: categoryId });

        if (!category) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        await Blog.updateMany(
            { categories: category._id },
            { $pull: { categories: category._id } }
        );

        await Categories.deleteOne({ _id: category._id });

        await Activity.create({
            type: "category",
            action: "deleted",
            message: `A category deleted: "${category.name}"`,
            timestamp: new Date(),
        });

        return NextResponse.json({ message: "Category deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting category:", error);
        return NextResponse.json({ error: "Error deleting category" }, { status: 500 });
    }
}
