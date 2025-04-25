// Generate slug from title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
};

// Format tags to show in blog
export const formatTags = (tags: string | string[]): string[] => {
  if (Array.isArray(tags)) return tags;
  return tags.split(",").map(tag => tag.trim()).filter(Boolean);
};

