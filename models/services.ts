import mongoose, { Schema, model, models } from "mongoose";

const serviceSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    importance: { type: String, required: true },
    benefits: { type: [String], required: true },
    imageUrl: { type: String, required: true },
    icon: { type: String, required: true },
    color: { type: String, required: true }, 
    order: { type: Number, required: true},
  },
  {
    timestamps: true,
  }
);

// Check if the model already exists to avoid OverwriteModelError
const Service = models.Service || model("Service", serviceSchema);

export default Service;
