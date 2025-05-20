import { NextRequest, NextResponse } from "next/server";
import { Admin } from "@/models/admin";
import { connectToDB } from "@/lib/MongoDB";
import Activity from "@/models/activity";

export async function PATCH(req: NextRequest) {
    await connectToDB();

    const { linkedin, facebook, twitter, instagram } = await req.json();

    const admin = await Admin.findOne();
    if (!admin) {
        return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    if (linkedin !== undefined) admin.linkedin = linkedin;
    if (facebook !== undefined) admin.facebook = facebook;
    if (twitter !== undefined) admin.twitter = twitter;
    if (instagram !== undefined) admin.instagram = instagram;

    await admin.save();

    await Activity.create({
        type: "settings",
        action: "updated",
        message: `Social media links changed.`,
        timestamp: new Date(),
    });

    return NextResponse.json({ message: "Links updated successfully" });
}

export async function GET() {
    await connectToDB();

    try {
        const admin = await Admin.findOne();
        return NextResponse.json(admin, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error fetching services" }, { status: 500 });
    }
}