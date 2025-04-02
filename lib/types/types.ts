import { ComponentType } from "react";
import { LucideIcon } from "lucide-react";

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
    id: string;
    title: string;
    description: string;
    content: string;
    importance: string;
    benefits: string[];
    imageUrl: string;
    icon: LucideIcon;
    color: string;
}

export type ServicesFormType = {
    title: string;
    description: string;
    content: string;
    importance: string;
    benefits: string[];
    imageUrl: string;
    icon: LucideIcon;
    color: string;
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
    excerpt: string;
    content: string;
    category: string;
    tags: string[];
    featuredImage: string;
    status: "published" | "draft";
    metaTitle: string;
    metaDescription: string;
    author: string;
    authorImage: string;
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

export interface BlogFormDataType {
    title: string;
    excerpt: string;
    content: string;
    category: string;
    tags: string;
    featuredImage: string;
    status: "published" | "draft";
    metaTitle: string;
    metaDescription: string;
    isPublished: boolean;
    publishDate: string;
}