"use client";

import Link from "next/link";

import { useLocalStorage } from "@/hooks/use-local-storage";
import type { BlogPostMeta } from "@/lib/blog";
import type { ManagedBlogPost } from "@/lib/blog-shared";
import { mergeBlogCollections } from "@/lib/blog-shared";
import { formatDate } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

type BlogPreviewSectionProps = {
  posts: BlogPostMeta[];
};

const EMPTY_POSTS: ManagedBlogPost[] = [];
const EMPTY_DELETED_BLOG_SLUGS: string[] = [];

export function BlogPreviewSection({ posts }: BlogPreviewSectionProps) {
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
  const allPosts = mergeBlogCollections(posts, localPosts);
  const featuredPosts = deletedReady
    ? allPosts.filter((post) => !deletedBlogSlugs.includes(post.slug)).slice(0, 3)
    : allPosts.slice(0, 3);

  return (
    <section id="blog" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <Reveal>
          <SectionHeading
            eyebrow="Blog"
            title="Writing on performance, delivery systems, and front-end craft."
            description="Markdown-backed posts keep publishing simple while still fitting cleanly into the app router and SEO pipeline."
          />
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-3">
          {featuredPosts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 0.06}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block rounded-4xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl transition hover:border-white/20"
              >
                <p className="text-xs uppercase tracking-[0.28em] text-accent">{post.category}</p>
                <h3 className="mt-4 text-2xl font-semibold text-foreground">{post.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted">{post.excerpt}</p>
                <div className="mt-6 flex items-center justify-between text-sm text-muted">
                  <span>{formatDate(post.date)}</span>
                  <span>{post.readingTime} min read</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <Link
            href="/blog"
            className="inline-flex items-center rounded-full border border-white/10 px-4 py-2 text-sm text-muted transition hover:border-white/20 hover:text-foreground"
          >
            View all posts
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
