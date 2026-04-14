"use client";

import { useState } from "react";

import { Bookmark, Heart, MessageCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { useLocalStorage } from "@/hooks/use-local-storage";
import type { BlogComment, BlogEngagement } from "@/lib/blog-shared";
import { formatDate } from "@/lib/utils";

const EMPTY_ENGAGEMENT: BlogEngagement[] = [];

function createDefaultEntry(slug: string, title: string): BlogEngagement {
  return {
    slug,
    title,
    likes: 0,
    liked: false,
    favorited: false,
    comments: [],
  };
}

export function BlogInteractions({ slug, title }: { slug: string; title: string }) {
  const { storedValue, setValue } = useLocalStorage<BlogEngagement[]>("portfolio.blogEngagement", EMPTY_ENGAGEMENT);
  const [author, setAuthor] = useState("");
  const [message, setMessage] = useState("");
  const entry = storedValue.find((item) => item.slug === slug) ?? createDefaultEntry(slug, title);

  const updateEntry = (nextEntry: BlogEngagement) => {
    setValue([nextEntry, ...storedValue.filter((item) => item.slug !== slug)]);
  };

  const toggleLike = () => {
    updateEntry({
      ...entry,
      likes: entry.liked ? Math.max(0, entry.likes - 1) : entry.likes + 1,
      liked: !entry.liked,
      title,
    });
  };

  const toggleFavorite = () => {
    updateEntry({
      ...entry,
      favorited: !entry.favorited,
      title,
    });
    toast.success(entry.favorited ? "Removed from favorites." : "Saved to favorites.");
  };

  const addComment = () => {
    if (!author.trim() || !message.trim()) {
      toast.error("Add your name and a comment before submitting.");
      return;
    }

    const nextComment: BlogComment = {
      id: crypto.randomUUID(),
      author: author.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    updateEntry({
      ...entry,
      title,
      comments: [nextComment, ...entry.comments],
    });

    setAuthor("");
    setMessage("");
    toast.success("Comment saved locally.");
  };

  const removeComment = (commentId: string) => {
    updateEntry({
      ...entry,
      title,
      comments: entry.comments.filter((comment) => comment.id !== commentId),
    });
  };

  return (
    <section className="mt-10 rounded-4xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={toggleLike}
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
            entry.liked
              ? "border-accent bg-accent text-accent-foreground"
              : "border-white/10 text-muted hover:border-white/20 hover:text-foreground"
          }`}
        >
          <Heart className="h-4 w-4" />
          {entry.likes} likes
        </button>
        <button
          type="button"
          onClick={toggleFavorite}
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
            entry.favorited
              ? "border-accent bg-accent text-accent-foreground"
              : "border-white/10 text-muted hover:border-white/20 hover:text-foreground"
          }`}
        >
          <Bookmark className="h-4 w-4" />
          {entry.favorited ? "Saved" : "Save favorite"}
        </button>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-muted">
          <MessageCircle className="h-4 w-4" />
          {entry.comments.length} comments
        </span>
      </div>

      <div className="mt-6 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm text-muted">
            Name
            <input
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              className="rounded-2xl border border-white/10 bg-background/70 px-4 py-3 text-foreground outline-none focus:border-accent"
              placeholder="Your name"
            />
          </label>
          <label className="grid gap-2 text-sm text-muted sm:col-span-2">
            Comment
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="min-h-28 rounded-3xl border border-white/10 bg-background/70 px-4 py-3 text-foreground outline-none focus:border-accent"
              placeholder="Write a comment about this post."
            />
          </label>
        </div>
        <div>
          <button
            type="button"
            onClick={addComment}
            className="inline-flex items-center rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-foreground"
          >
            Save comment
          </button>
        </div>
      </div>

      <div className="mt-8 space-y-3">
        {entry.comments.length ? (
          entry.comments.map((comment) => (
            <article key={comment.id} className="rounded-3xl border border-white/10 bg-background/70 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-foreground">{comment.author}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.22em] text-muted">{formatDate(comment.createdAt)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeComment(comment.id)}
                  className="inline-flex items-center rounded-full border border-white/10 px-3 py-1.5 text-xs text-muted transition hover:border-red-300/30 hover:text-red-200"
                >
                  <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                  Remove
                </button>
              </div>
              <p className="mt-3 text-sm leading-7 text-muted">{comment.message}</p>
            </article>
          ))
        ) : (
          <div className="rounded-3xl border border-dashed border-white/10 bg-background/50 p-4 text-sm text-muted">
            No comments yet. Add the first one and it will be stored locally in this browser.
          </div>
        )}
      </div>
    </section>
  );
}