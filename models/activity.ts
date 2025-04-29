import mongoose, { Schema, model, models } from "mongoose";

const activitySchema = new Schema(
    {
        type: { type: String, enum: ["blog", "service", "testimonial", "category"], required: true },
        action: { type: String },
        message: { type: String },
    },
    {
        timestamps: true,
    }
);

const Activity = models.Activity || model("Activity", activitySchema);

export default Activity;
