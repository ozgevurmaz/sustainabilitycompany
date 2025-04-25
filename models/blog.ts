import mongoose, { Schema, model, models } from "mongoose";

const BlogSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    featuredImage: { type: String, required: true },

    categories: [{ type: Schema.Types.ObjectId, ref: "Categories" }],
    tags: { type: [String], default: [] },

    metaTitle: { type: String },
    metaDescription: { type: String },

    status: {
      type: String,
      enum: ["published", "draft", "scheduled"],
      default: "draft",
    },
    isPublished: { type: Boolean, default: false },

    publishDate: { type: String },
    publishTime: { type: String },
    readTime: { type: String, default: "" },

    views: { type: Number, default: 0 },

    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Blog = models.Blog || model("Blog", BlogSchema);
export default Blog;
