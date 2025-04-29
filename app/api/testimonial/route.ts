import { connectToDB } from "@/lib/MongoDB";
import Testimonial from "@/models/testimonial";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await connectToDB();

  try {
    const blogs = await Testimonial.find({})
      .sort({ updatedAt: -1 });
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching blogs" }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
  try {
    await connectToDB();
console.log("conneted to db")
    const { name, company, position, comment, rating, imageUrl, featured } = await req.json();
console.log("datas getted")
    if (!name || !company) {
      return NextResponse.json({ error: "Name and company name are required." })
    }

    const testimonial = await Testimonial.create({ name, company, position, comment, rating, imageUrl, featured })
console.log(testimonial)
    return NextResponse.json(testimonial, { status: 201 })
  } catch (error) {
    console.log("Error creating testimonial:", error);
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 })
  }
}
