"use client";

import Image from "next/image";
import Link from "next/link";

import { useLocalStorage } from "@/hooks/use-local-storage";
import type { BlogPostMeta } from "@/lib/blog";
import type { ManagedBlogPost } from "@/lib/blog-shared";
import { mergeBlogCollections } from "@/lib/blog-shared";
import { formatDate } from "@/lib/utils";

const EMPTY_POSTS: ManagedBlogPost[] = [];
const EMPTY_DELETED_BLOG_SLUGS: string[] = [];

export function BlogIndexList({ posts }: { posts: BlogPostMeta[] }) {
  const { ready, storedValue } = useLocalStorage<ManagedBlogPost[]>("portfolio.blogPosts", EMPTY_POSTS);
  const { ready: deletedReady, storedValue: deletedBlogSlugs } = useLocalStorage<string[]>(
    "portfolio.deletedBlogSlugs",
    EMPTY_DELETED_BLOG_SLUGS,
  );
  const localPosts = ready
    ? storedValue.map((post) => ({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        date: post.date,
        category: post.category,
        coverImage: post.coverImage,
        readingTime: post.readingTime,
      }))
    : [];
  const mergedPosts = mergeBlogCollections(posts, localPosts);
  const visiblePosts = deletedReady
    ? mergedPosts.filter((post) => !deletedBlogSlugs.includes(post.slug))
    : mergedPosts;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {visiblePosts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group overflow-hidden rounded-4xl border border-white/10 bg-white/6 backdrop-blur-xl transition hover:border-white/20"
        >
          <div className="relative aspect-video overflow-hidden border-b border-white/10">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 1200px) 100vw, 50vw"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-[0.28em] text-accent">{post.category}</p>
              {localPosts.some((localPost) => localPost.slug === post.slug) ? (
                <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-muted">
                  Local
                </span>
              ) : null}
            </div>
            <h2 className="mt-4 text-3xl font-semibold text-foreground">{post.title}</h2>
            <p className="mt-4 text-sm leading-7 text-muted">{post.excerpt}</p>
            <div className="mt-6 flex items-center justify-between text-sm text-muted">
              <span>{formatDate(post.date)}</span>
              <span>{post.readingTime} min read</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}