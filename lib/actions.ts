import { setCachedServices, getCachedServices, getCachedBlogs, setCachedBlogs, getCachedCategories, getCachedTestimonials, getCachedActivities, setCachedActivities, setCachedTestimonials, getCachedAdminLinks, setCachedAdminLinks } from "@/lib/cache";
import { BlogPostType, ServicesType } from "./types/types";

export async function fetchServices(filter?: string) {
  const cached = getCachedServices();
  if (cached) {
    return applyFilterAndSortServices(cached, filter);
  }

  const response = await fetch('/api/services');
  if (!response.ok) {
    throw new Error('Failed to fetch services');
  }
  let data = await response.json();

  setCachedServices(data);
  return applyFilterAndSortServices(data, filter);
}

function applyFilterAndSortServices(data: ServicesType[], filter?: string) {
  if (filter) {
    const lowerFilter = filter.toLowerCase();
    data = data.filter(service =>
      service.title.toLowerCase().includes(lowerFilter) ||
      service.description.toLowerCase().includes(lowerFilter) ||
      service.benefits.some(benefit =>
        benefit.toLowerCase().includes(lowerFilter)
      )
    );
  }

  return data.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export async function fetchBlogs(filter?: string) {
  const cached = getCachedBlogs();
  if (cached) {
    return applyFilterAndSortBlogs(cached, filter);
  }
  const response = await fetch('/api/blog');
  if (!response.ok) {
    throw new Error('Failed to fetch blog');
  }
  let data = await response.json();
  const sorted = data.sort((a: BlogPostType, b: BlogPostType) =>
    new Date(b.publishDate || 0).getTime() - new Date(a.publishDate || 0).getTime()
  );
  setCachedBlogs(sorted);
  return applyFilterAndSortBlogs(sorted, filter);
}

function applyFilterAndSortBlogs(data: BlogPostType[], filter?: string) {
  if (filter) {
    const lowerFilter = filter.toLowerCase();
    data = data.filter(service =>
      service.title.toLowerCase().includes(lowerFilter) ||
      service.content.toLowerCase().includes(lowerFilter) ||
      service.excerpt.toLowerCase().includes(lowerFilter)
    );
  }

  return data
}

export async function fetchPublishedBlogs(filter?: string) {
  const cached = getCachedBlogs();
  if (cached) {
    return applyFilterAndSortBlogs(cached, filter);
  }
  const response = await fetch('/api/blog/client');
  if (!response.ok) {
    throw new Error('Failed to fetch blog');
  }
  let data = await response.json();
  const sorted = data.sort((a: BlogPostType, b: BlogPostType) =>
    new Date(b.updatedAt || 0).getTime() - new Date(a.updatedAt || 0).getTime()
  );
  setCachedBlogs(sorted);
  return applyFilterAndSortBlogs(sorted, filter);
}

export async function fetchCategories() {
  const cached = getCachedCategories();
  if (cached) {
    return cached
  }
  const response = await fetch('/api/categories');
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  const data = await response.json();
  return data;
}


export async function fetchTestimonials() {
  const cached = getCachedTestimonials();
  if (cached) {
    return cached;
  }

  const response = await fetch("/api/testimonial");
  if (!response.ok) {
    throw new Error("Failed to fetch testimonials")
  }
  const data = await response.json();
  setCachedTestimonials(data)
  return data
}

export async function fetchActivities() {
  const cached = getCachedActivities();
  if (cached) return cached;

  const response = await fetch("/api/activities");
  if (!response.ok) {
    throw new Error("Failed to fetch activities");
  }

  const data = await response.json();
  setCachedActivities(data);
  return data;
}

export async function fetchAdminLinks() {
  const cached = getCachedAdminLinks();
  if (cached) return cached;

  const response = await fetch("/api/admin/links");
  if (!response.ok) {
    throw new Error("Failed to fetch links");
  }
  
  const data = await response.json();
  setCachedAdminLinks(data);
  return data;
}