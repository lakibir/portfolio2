import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { BlogInteractions } from "@/components/sections/blog-interactions";
import { LocalBlogPostView } from "@/components/sections/local-blog-post-view";
import { getBlogPostBySlug, getBlogSlugs } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return <LocalBlogPostView slug={slug} />;
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
          <h1 className="mt-4 text-balance text-4xl font-semibold text-foreground sm:text-5xl">
            {post.title}
          </h1>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-muted">
            <span>{formatDate(post.date)}</span>
            <span>{post.readingTime} min read</span>
          </div>
          <div className="prose-content mt-10" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
          <BlogInteractions slug={post.slug} title={post.title} />
        </div>
      </article>
    </main>
  );
}
