import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/MongoDB";
import Service from "@/models/services";

// Get a single service by Slug
export async function GET(req: Request, { params }: { params: { serviceSlug: string } }) {
  await connectToDB();

  try {
    const service = await Service.findOne({ slug: params.serviceSlug });

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json(service, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching service" }, { status: 500 });
  }
}

// Update a service by Slug
export async function PUT(req: Request, { params }: { params: { serviceSlug: string } }) {
  await connectToDB();

  try {
    const data = await req.json();

    const updatedService = await Service.findOneAndUpdate({ slug: params.serviceSlug }, data, {
      new: true,
    });

    if (!updatedService) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json(updatedService, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error updating service" }, { status: 500 });
  }
}


// Delete a service by Slug
export async function DELETE(req: Request, { params }: { params: { serviceSlug: string } }) {
  await connectToDB();

  try {
    const deletedService = await Service.findOneAndDelete({ slug: params.serviceSlug });

    if (!deletedService) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Service deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting service" }, { status: 500 });
  }
}