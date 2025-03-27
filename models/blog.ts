import mongoose, { Schema, model, models } from "mongoose";

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String, required: true }, // Cover image URL
    slug: { type: String, unique: true, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Blog = models.Blog || model("Blog", BlogSchema);
export default Blog;
