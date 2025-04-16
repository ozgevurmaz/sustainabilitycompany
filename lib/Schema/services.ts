import { z } from "zod";

export const serviceSchema = z.object({
  title: z.string().min(3, "Title is required"),
  slug: z.string().min(3, "Slug is required"),
  description: z.string().min(10, "Description is too short"),
  content: z.string().min(10, "Content is too short"),
  importance: z.string().min(10, "Importance is required"),
  benefits: z.array(z.string()).min(1, "Add at least one benefit"),
  imageUrl: z.string().url("Image URL must be valid"),
  icon: z.string().min(1, "Icon is required"),
  color: z.string().min(1, "Color is required"),
});