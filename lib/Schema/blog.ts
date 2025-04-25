import { z } from "zod";

export const blogPostSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  slug: z.string().min(3, "Slug is required"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
  content: z.string().min(20, "Content must be at least 20 characters"),
  featuredImage: z.string().url("Cover image must be a valid URL"),

  categories: z.array(z.string()),
  tags: z.union([z.array(z.string()), z.string()]).optional(),

  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),

  status: z.enum(["published", "draft", "scheduled"]).default("draft"),
  isPublished: z.boolean().default(false),

  publishDate: z.string().optional(),
  publishTime: z.string().optional().default(""),
  readTime: z.string().optional(),

  views: z.number().min(0).default(0),
});
