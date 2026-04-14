export type ManagedBlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  coverImage: string;
  readingTime: number;
  content: string;
  source?: "local" | "markdown";
};

export type BlogComment = {
  id: string;
  author: string;
  message: string;
  createdAt: string;
};

export type BlogEngagement = {
  slug: string;
  title: string;
  likes: number;
  liked: boolean;
  favorited: boolean;
  comments: BlogComment[];
};

export function calculateReadingTime(content: string) {
  return Math.max(1, Math.ceil(content.split(/\s+/).filter(Boolean).length / 180));
}

export function createExcerpt(content: string, explicitExcerpt?: string) {
  if (explicitExcerpt?.trim()) {
    return explicitExcerpt.trim();
  }

  return content.replace(/[#>*_`\-]/g, "").replace(/\s+/g, " ").trim().slice(0, 160);
}

export function mergeBlogCollections<T extends { slug: string; date: string }>(base: T[], local: T[]) {
  const merged = new Map<string, T>();

  base.forEach((item) => {
    merged.set(item.slug, item);
  });

  local.forEach((item) => {
    merged.set(item.slug, item);
  });

  return Array.from(merged.values()).sort((left, right) => (left.date < right.date ? 1 : -1));
}