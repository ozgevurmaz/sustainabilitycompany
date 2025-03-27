import mongoose, { Schema, model, models } from "mongoose";

const ServiceSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    importance: { type: String, required: true },
    benefits: [{ type: String, required: true }],
    imageUrl: { type: String, required: true },
    icon: { type: String, required: false },
    color: { type: String, required: false },
    id: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

const Service = models.Service || model("Service", ServiceSchema);
export default Service;
