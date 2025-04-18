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

export type BlogType = {
    _id: string;
    title: string;
    excerpt: string;
    imageUrl: string;
    slug: string;
    readTime: string;
    category: string[];
    date: string;
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
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    categories: string[];
    tags: string[] | string;
    featuredImage: string;
    status: "published" | "draft";
    isPublished: boolean;
    metaTitle: string;
    metaDescription: string;
    publishDate: string;
    readTime: string;
    views: number;
    likes: number;
    comments: number;
}

export interface CategoryType {
    id: number;
    name: string;
    postCount: number;
}