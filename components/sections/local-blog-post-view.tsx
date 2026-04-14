"use client";

import Image from "next/image";
import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import { useLocalStorage } from "@/hooks/use-local-storage";
import { BlogInteractions } from "@/components/sections/blog-interactions";
import type { ManagedBlogPost } from "@/lib/blog-shared";
import { formatDate } from "@/lib/utils";

const EMPTY_POSTS: ManagedBlogPost[] = [];

export function LocalBlogPostView({ slug }: { slug: string }) {
  const { ready, storedValue } = useLocalStorage<ManagedBlogPost[]>("portfolio.blogPosts", EMPTY_POSTS);
  const post = storedValue.find((item) => item.slug === slug);

  if (!ready) {
    return (
      <main className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl animate-pulse rounded-4xl border border-white/10 bg-white/6 p-10 backdrop-blur-xl">
          <div className="h-10 w-48 rounded-full bg-white/10" />
          <div className="mt-6 h-16 rounded-4xl bg-white/10" />
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-4xl border border-white/10 bg-white/6 p-10 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.35em] text-accent">Post not found</p>
          <h1 className="mt-4 text-4xl font-semibold text-foreground">This local post is not available in this browser.</h1>
          <p className="mt-4 text-base leading-8 text-muted">
            Local blog content is stored in browser storage. Open the admin dashboard on the same browser to recreate or edit it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-muted transition hover:border-white/20 hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              All posts
            </Link>
            <Link
              href="/admin"
              className="inline-flex items-center rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
            >
              Open admin
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="px-4 py-16 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-4xl overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/6 backdrop-blur-xl">
        <div className="relative aspect-16/8 overflow-hidden border-b border-white/10">
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" sizes="100vw" priority />
        </div>
        <div className="p-6 sm:p-10">
          <div className="mb-6 flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-muted transition hover:border-white/20 hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              All posts
            </Link>
            <Link
              href="/#blog"
              className="inline-flex items-center rounded-full border border-white/10 px-4 py-2 text-sm text-muted transition hover:border-white/20 hover:text-foreground"
            >
              Back to portfolio
            </Link>
          </div>
          <p className="text-xs uppercase tracking-[0.35em] text-accent">{post.category}</p>
          <h1 className="mt-4 text-balance text-4xl font-semibold text-foreground sm:text-5xl">{post.title}</h1>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-muted">
            <span>{formatDate(post.date)}</span>
            <span>{post.readingTime} min read</span>
            <span>Local content</span>
          </div>
          <div className="mt-10 space-y-6 text-base leading-8 text-muted">
            {post.content.split(/\n\s*\n/).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <BlogInteractions slug={post.slug} title={post.title} />
        </div>
      </article>
    </main>
  );
}