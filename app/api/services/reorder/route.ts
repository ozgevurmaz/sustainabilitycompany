import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/MongoDB";
import Service from "@/models/services";

export async function PUT(req: Request) {
  try {
    await connectToDB();
    const { updates } = await req.json();
    
    console.log("Received updates:", updates);
    
    if (!updates || !Array.isArray(updates)) {
      return NextResponse.json(
        { error: "Invalid updates format" }, 
        { status: 400 }
      );
    }
    
    for (const { slug, order } of updates) {
      console.log(`Updating service with slug: ${slug} to order: ${order}`);
      
      const updatedService = await Service.findOneAndUpdate(
        { slug }, 
        { $set: { order } },
        { new: true }
      );
      
      console.log("Updated service:", updatedService);
    }
    
    return NextResponse.json({ message: "Order updated" }, { status: 200 });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json({ 
      error: "Failed to update order",
    }, { status: 500 });
  }
}