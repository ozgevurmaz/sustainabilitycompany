import { NextRequest, NextResponse } from "next/server";
import { Admin } from "@/models/admin";
import { connectToDB } from "@/lib/MongoDB";
import Activity from "@/models/activity";

export async function PATCH(req: NextRequest) {
    await connectToDB();

    const { newEmail } = await req.json();

    const admin = await Admin.findOne();
    if (!admin) {
        return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    admin.email = newEmail;
    await admin.save();

    await Activity.create({
        type: "settings",
        action: "updated",
        message: `Admin email changed`,
        timestamp: new Date(),
    });

    return NextResponse.json({ message: "Email updated successfully" });
}