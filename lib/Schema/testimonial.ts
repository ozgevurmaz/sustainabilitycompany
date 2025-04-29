import { z } from "zod";

export const testimonialSchema = z.object({
    name: z.string().min(5, "Title must be at least 5 characters"),
    company: z.string().min(3, "Company name must be at least 3 characters"),
    position: z.string().optional(),
    comment: z.string().optional(),
    rating: z.number().min(1).max(5),
    imageUrl: z.string().optional(),
    featured: z.boolean()
});

