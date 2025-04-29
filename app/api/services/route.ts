import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/MongoDB";
import Service from "@/models/services";
import Activity from "@/models/activity";

// Get all services
export async function GET() {
  await connectToDB();

  try {
    const services = await Service.find().sort({ createdAt: -1 });
    return NextResponse.json(services, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching services" }, { status: 500 });
  }
}

// Post a service by ID
export async function POST(req: NextRequest) {

  try {
    await connectToDB();

    const data = await req.json();
    const { title, description, content, importance, benefits, imageUrl, icon, color, slug } = data;

    if (!title || !description || !content || !importance || !benefits || !imageUrl || !slug) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    const lastService = await Service.findOne().sort({ order: -1 });
    const nextOrder = lastService ? lastService.order + 1 : 1;


    const newService = await Service.create({
      title,
      description,
      content,
      importance,
      benefits,
      imageUrl,
      icon,
      color,
      slug,
      order: nextOrder
    });

    await Activity.create({
      type: "service",
      action: "created",
      message: `A service published: "${title}"`,
      timestamp: new Date(),
    });

    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    console.error("Error in POST function:", error);
    return NextResponse.json({ error: "Error creating service" }, { status: 500 });
  }
}