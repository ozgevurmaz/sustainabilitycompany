import mongoose, { Schema, model, models } from "mongoose";

const testimonialSchema = new Schema(
    {
        name: { type: String, required: true },
        company: { type: String, required: true },
        position: { type: String },
        comment: { type: String },
        rating: { type: Number, default: 5 },
        imageUrl: { type: String },
        featured: { type: Boolean, default: true }
    },
    {
        timestamps: true,
    }
);

const Testimonial = models.Testimonial || model("Testimonial", testimonialSchema);

export default Testimonial;
