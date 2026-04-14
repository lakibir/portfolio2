import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

import { calculateReadingTime, createExcerpt } from "@/lib/blog-shared";

const blogDirectory = path.join(process.cwd(), "content", "blog");

export type BlogPostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  coverImage: string;
  readingTime: number;
};

export type BlogPost = BlogPostMeta & {
  contentHtml: string;
};

async function readMarkdownFile(slug: string) {
  const fullPath = path.join(blogDirectory, `${slug}.md`);
  const fileContents = await fs.readFile(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: String(data.title ?? slug),
    excerpt: String(data.excerpt ?? ""),
    date: String(data.date ?? new Date().toISOString()),
    category: String(data.category ?? "Engineering"),
    coverImage: String(data.coverImage ?? "/projects/project-analytics.svg"),
    content,
    readingTime: calculateReadingTime(content),
  };
}

export async function getBlogSlugs() {
  const files = await fs.readdir(blogDirectory);
  return files.filter((file) => file.endsWith(".md")).map((file) => file.replace(/\.md$/, ""));
}

export async function getAllBlogPosts(): Promise<BlogPostMeta[]> {
  const slugs = await getBlogSlugs();
  const posts = await Promise.all(slugs.map((slug) => readMarkdownFile(slug)));

  return posts
    .sort((left, right) => (left.date < right.date ? 1 : -1))
    .map(({ content, ...meta }) => ({
      ...meta,
      excerpt: createExcerpt(content, meta.excerpt),
    }));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const post = await readMarkdownFile(slug);
    const processedContent = await remark().use(html).process(post.content);

    return {
      ...post,
      contentHtml: processedContent.toString(),
      excerpt: createExcerpt(post.content, post.excerpt),
    };
  } catch {
    return null;
  }
}
