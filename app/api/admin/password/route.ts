import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Admin } from "@/models/admin";
import { connectToDB } from "@/lib/MongoDB";
import Activity from "@/models/activity";


export async function PATCH(req: NextRequest) {
  await connectToDB();
  const { currentPassword, newPassword, email } = await req.json();

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return NextResponse.json({ error: "Admin not found" }, { status: 404 });
  }

  const isValid = await bcrypt.compare(currentPassword, admin.password);
  if (!isValid) {
    return NextResponse.json({ error: "Incorrect current password" }, { status: 401 });
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  admin.password = hashedNewPassword;
  await admin.save();

  await Activity.create({
    type: "settings",
    action: "updated",
    message: `Admin password changed`,
    timestamp: new Date(),
  });

  return NextResponse.json({ message: "Password updated successfully" });
}