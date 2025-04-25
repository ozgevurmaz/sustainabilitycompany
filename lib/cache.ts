import { BlogPostType, CategoryType, ServicesType } from "@/lib/types/types";


let cachedServices: ServicesType[] | null = null;
let cachedBlogs: BlogPostType[] | null = null;
let cachedPublishedBlogs: BlogPostType[] | null = null;
let cachedCategories: CategoryType[] | null = null;

export function setCachedServices(data: ServicesType[] | null) {
  cachedServices = data;
}

export function getCachedServices() {
  return cachedServices;
}

export function setCachedBlogs(data: BlogPostType[] | null) {
  cachedBlogs = data;
}

export function getCachedBlogs() {
  return cachedBlogs;
}

export function setCachedPublishedBlogs(data: BlogPostType[] | null) {
  cachedPublishedBlogs = data;
}

export function getCachedPublishedBlogs() {
  return cachedBlogs;
}


export function setCachedCategories(data: CategoryType[] | null) {
  cachedCategories = data;
}

export function getCachedCategories() {
  return cachedCategories;
}