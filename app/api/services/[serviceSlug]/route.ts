import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/MongoDB";
import Service from "@/models/services";
import Activity from "@/models/activity";

type Params = {
  params: {
    serviceSlug: string;
  };
};
// Get a single service by Slug
export async function GET(req: NextRequest, { params }: Params) {
  await connectToDB();
  const { serviceSlug } = params;
  try {
    const service = await Service.findOne({ slug:serviceSlug });
    if (!service) {
      return new Response(JSON.stringify({ message: "Service not found" }), { status: 404 });
    }
    return new Response(JSON.stringify(service), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Something went wrong" }), { status: 500 });
  }
}

// Update a service by Slug
export async function PUT(req: NextRequest, { params }: Params) {
  await connectToDB();
  const { serviceSlug } = params;
  try {
    const data = await req.json();

    const updatedService = await Service.findOneAndUpdate({ slug:serviceSlug }, data, {
      new: true,
    });

    if (!updatedService) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    await Activity.create({
      type: "service",
      action: "edited",
      message: `A service published: "${updatedService.title}"`,
      timestamp: new Date(),
    });

    return NextResponse.json(updatedService, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error updating service" }, { status: 500 });
  }
}


// Delete a service by Slug
export async function DELETE(req: NextRequest, { params }: Params) {
  await connectToDB();
  const { serviceSlug } = params;
  try {
    const deletedService = await Service.findOneAndDelete({ slug: serviceSlug });

    if (!deletedService) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }
    await Activity.create({
      type: "service",
      action: "deleted",
      message: `A service published: "${deletedService.title}"`,
      timestamp: new Date(),
    });
    return NextResponse.json({ message: "Service deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting service" }, { status: 500 });
  }
}