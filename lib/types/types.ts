export type HeroSectionType = {
    title: string;
    subtitle: string;
    image: string;
}

export type FormTypes = {
    name: string;
    email: string;
    title: string;
    message: string;
}

export type ServicesType = {
    _id: string;
    title: string;
    slug: string;
    description: string;
    content: string;
    importance: string;
    benefits: string[];
    imageUrl: string;
    icon: string;
    color: string;
    order?: number;
}

export type TestimonialType = {
    id: number;
    name: string;
    company: string;
    position: string;
    comment: string;
    rating: number;
    imageUrl: string;
    featured: boolean;
    date: string;
}

export type TestimonialFormType = {
    name: string;
    company: string;
    position: string;
    comment: string;
    rating: number;
    imageUrl: string;
}

export interface BlogPostType {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    categories: string[];
    tags: string[];
    featuredImage: string;
    status: "published" | "draft" | "scheduled";
    isPublished: boolean;
    metaTitle: string;
    metaDescription: string;
    publishDate: string;
    publishTime?: string;
    readTime: string;
    views: number;
}

export interface CategoryType {
    _id: string;
    name: string;
    postCount: number;
}