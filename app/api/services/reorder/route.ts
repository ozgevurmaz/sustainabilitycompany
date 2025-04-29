import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/MongoDB";
import Service from "@/models/services";
import Activity from "@/models/activity";

export async function PUT(req: NextRequest) {
  try {
    await connectToDB();
    const { updates } = await req.json();

    if (!updates || !Array.isArray(updates)) {
      return NextResponse.json(
        { error: "Invalid updates format" },
        { status: 400 }
      );
    }

    for (const { slug, order } of updates) {

      const updatedService = await Service.findOneAndUpdate(
        { slug },
        { $set: { order } },
        { new: true }
      );
    }

    await Activity.create({
      type: "service",
      action: "edited",
      message: `A service published: "${updates[0].title}"`,
      timestamp: new Date(),
    });
    
    await Activity.create({
      type: "service",
      action: "edited",
      message: `A service published: "${updates[1].title}"`,
      timestamp: new Date(),
    });
    
    return NextResponse.json({ message: "Order updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      error: "Failed to update order",
    }, { status: 500 });
  }
}