import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/MongoDB";
import Service from "@/models/services";

// Create a new service
export async function POST(req: Request) {
  console.log("req started")
  await connectToDB();
  console.log("Database connected")
  try {
    const data = await req.json();

    const { title, description, content, importance, benefits, imageUrl, icon, color, id } = data;
    console.log(data);
    if (!title || !description || !content || !importance || !benefits || !imageUrl || !id) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    console.log("2")
    const newService = await Service.create({
      title,
      description,
      content,
      importance,
      benefits,
      imageUrl,
      icon,
      color,
      id,
    });
    console.log("data added")
    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating service" }, { status: 500 });
  }
}

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
