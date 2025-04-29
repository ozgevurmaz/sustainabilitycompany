import { NextResponse } from "next/server";
import Activity from "@/models/activity";
import { connectToDB } from "@/lib/MongoDB";


export async function GET() {
    await connectToDB();
    const activities = await Activity.find({}).sort({ timestamp: -1 }).limit(10);
    return NextResponse.json(activities);
}
