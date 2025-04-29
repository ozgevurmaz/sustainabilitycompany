import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/MongoDB";
import Testimonial from "@/models/testimonial";
import Activity from "@/models/activity";

export async function GET(req: NextRequest, context: { params: { testimonialId: string } }) {
    await connectToDB();
    const { testimonialId } = context.params;
    try {
        const testimonial = await Testimonial.findOne({ _id: testimonialId });
        if (!testimonial) {
            return new Response(JSON.stringify({ message: "Testimonial not found" }), { status: 404 });
        }
        return NextResponse.json(testimonial, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Testimonial not found" }, { status: 404 });
    }
}

export async function PUT(req: NextRequest, context: { params: { testimonialId: string } }) {
    await connectToDB();
    const { testimonialId } = context.params;
    try {
        const data = await req.json();

        const updatedTestimonial = await Testimonial.findOneAndUpdate({ _id: testimonialId }, data, {
            new: true,
        });

        if (!updatedTestimonial) {
            return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
        }
        await Activity.create({
            type: "testimonial",
            action: "edited",
            message: `A testimonial published.`,
            timestamp: new Date(),
        });
        return NextResponse.json(updatedTestimonial, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error updating testimonial" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, context: { params: { testimonialId: string } }) {
    await connectToDB();
    const { testimonialId } = context.params;
    try {
        const deletedTestimonial = await Testimonial.findOneAndDelete({ _id: testimonialId });

        if (!deletedTestimonial) {
            return NextResponse.json({ error: "Testimonial not found" }, { status: 404 });
        }
        await Activity.create({
            type: "testimonial",
            action: "deleted",
            message: `A testimonial published.`,
            timestamp: new Date(),
        });

        return NextResponse.json({ message: "Testimonial deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error deleting testimonial" }, { status: 500 });
    }
}