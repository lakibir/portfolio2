import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { BlogIndexList } from "@/components/sections/blog-index-list";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Markdown-powered notes on engineering systems, product delivery, and front-end craft.",
};

export default async function BlogIndexPage() {
  const posts = await getAllBlogPosts();

  return (
    <main className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <header className="max-w-3xl space-y-4">
          <Link
            href="/#blog"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-muted transition hover:border-white/20 hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to portfolio
          </Link>
          <p className="text-xs uppercase tracking-[0.35em] text-accent">Blog</p>
          <h1 className="text-balance text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
            Notes on shipping better software.
          </h1>
          <p className="text-lg leading-8 text-muted">
            Lightweight markdown publishing, rendered through the app router with metadata, static generation, and a clean reading surface.
          </p>
        </header>
        <BlogIndexList posts={posts} />
      </div>
    </main>
  );
}
