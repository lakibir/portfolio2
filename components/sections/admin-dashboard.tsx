"use client";

import { useState } from "react";

import { Download, Plus, RotateCcw, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { useLocalStorage } from "@/hooks/use-local-storage";
import type { BlogPostMeta } from "@/lib/blog";
import type { BlogEngagement, ManagedBlogPost } from "@/lib/blog-shared";
import { calculateReadingTime, createExcerpt } from "@/lib/blog-shared";
import type { PortfolioProject } from "@/lib/portfolio";
import { formatDate, slugify } from "@/lib/utils";

const initialDraft: PortfolioProject = {
  id: "",
  title: "",
  description: "",
  image: "/projects/project-analytics.svg",
  categories: ["Custom"],
  stack: ["Next.js"],
  githubUrl: "https://github.com",
  liveUrl: "https://example.com",
  featured: false,
};

const EMPTY_LOCAL_POSTS: ManagedBlogPost[] = [];
const EMPTY_ENGAGEMENT: BlogEngagement[] = [];
const EMPTY_DELETED_BLOG_SLUGS: string[] = [];
const initialBlogDraft: ManagedBlogPost = {
  slug: "",
  title: "",
  excerpt: "",
  date: new Date().toISOString().slice(0, 10),
  category: "Engineering",
  coverImage: "/projects/project-analytics.svg",
  readingTime: 1,
  content: "",
  source: "local",
};

type AdminDashboardProps = {
  projects?: PortfolioProject[];
  blogPosts?: BlogPostMeta[];
  cmsConfigured: boolean;
};

export function AdminDashboard({ projects = [], blogPosts = [], cmsConfigured }: AdminDashboardProps) {
  const { storedValue, setValue } = useLocalStorage<PortfolioProject[]>("portfolio.projects", projects);
  const { storedValue: storedBlogPosts, setValue: setBlogPosts } = useLocalStorage<ManagedBlogPost[]>(
    "portfolio.blogPosts",
    EMPTY_LOCAL_POSTS,
  );
  const { storedValue: deletedBlogSlugs, setValue: setDeletedBlogSlugs } = useLocalStorage<string[]>(
    "portfolio.deletedBlogSlugs",
    EMPTY_DELETED_BLOG_SLUGS,
  );
  const { storedValue: storedEngagement, setValue: setEngagement } = useLocalStorage<BlogEngagement[]>(
    "portfolio.blogEngagement",
    EMPTY_ENGAGEMENT,
  );
  const [draft, setDraft] = useState<PortfolioProject>(initialDraft);
  const [blogDraft, setBlogDraft] = useState<ManagedBlogPost>(initialBlogDraft);

  const saveProject = () => {
    if (!draft.title || !draft.description) {
      toast.error("Title and description are required.");
      return;
    }

    const nextProject: PortfolioProject = {
      ...draft,
      id: draft.id || draft.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      categories: draft.categories.filter(Boolean),
      stack: draft.stack.filter(Boolean),
    };

    setValue([nextProject, ...storedValue.filter((project) => project.id !== nextProject.id)]);
    setDraft(initialDraft);
    toast.success("Project saved to local admin storage.");
  };

  const removeProject = (id: string) => {
    setValue(storedValue.filter((project) => project.id !== id));
    toast.success("Project removed.");
  };

  const resetProjects = () => {
    setValue(projects);
    toast.success("Local overrides reset to defaults.");
  };

  const exportProjects = () => {
    const blob = new Blob([JSON.stringify(storedValue, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "portfolio-projects.json";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const saveBlogPost = () => {
    if (!blogDraft.title.trim() || !blogDraft.content.trim()) {
      toast.error("Blog title and content are required.");
      return;
    }

    const content = blogDraft.content.trim();
    const slug = blogDraft.slug || slugify(blogDraft.title);
    const nextPost: ManagedBlogPost = {
      ...blogDraft,
      slug,
      title: blogDraft.title.trim(),
      excerpt: createExcerpt(content, blogDraft.excerpt),
      date: blogDraft.date || new Date().toISOString().slice(0, 10),
      readingTime: calculateReadingTime(content),
      content,
      source: "local",
    };

    setBlogPosts([nextPost, ...storedBlogPosts.filter((post) => post.slug !== slug)]);
    setDeletedBlogSlugs(deletedBlogSlugs.filter((item) => item !== slug));
    setBlogDraft(initialBlogDraft);
    toast.success("Blog post saved to local admin storage.");
  };

  const removeBlogPost = (slug: string) => {
    setBlogPosts(storedBlogPosts.filter((post) => post.slug !== slug));
    if (!deletedBlogSlugs.includes(slug)) {
      setDeletedBlogSlugs([slug, ...deletedBlogSlugs]);
    }
    toast.success("Local blog post removed.");
  };

  const resetBlogPosts = () => {
    setBlogPosts([]);
    toast.success("Local blog content cleared.");
  };

  const exportBlogPosts = () => {
    const blob = new Blob([JSON.stringify(storedBlogPosts, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "portfolio-blog-posts.json";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const clearEngagementEntry = (slug: string) => {
    setEngagement(storedEngagement.filter((entry) => entry.slug !== slug));
    toast.success("Saved engagement entry removed.");
  };

  const resetEngagement = () => {
    setEngagement([]);
    toast.success("Saved likes, favorites, and comments cleared.");
  };

  const exportEngagement = () => {
    const blob = new Blob([JSON.stringify(storedEngagement, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "portfolio-blog-engagement.json";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-4">
        <div className="rounded-4xl border border-white/10 bg-white/6 p-5 backdrop-blur-xl">
          <p className="text-sm text-muted">Local projects</p>
          <p className="mt-2 text-3xl font-semibold text-foreground">{storedValue.length}</p>
        </div>
        <div className="rounded-4xl border border-white/10 bg-white/6 p-5 backdrop-blur-xl">
          <p className="text-sm text-muted">Markdown blog posts</p>
          <p className="mt-2 text-3xl font-semibold text-foreground">{blogPosts.length}</p>
        </div>
        <div className="rounded-4xl border border-white/10 bg-white/6 p-5 backdrop-blur-xl">
          <p className="text-sm text-muted">Local blog posts</p>
          <p className="mt-2 text-3xl font-semibold text-foreground">{storedBlogPosts.length}</p>
        </div>
        <div className="rounded-4xl border border-white/10 bg-white/6 p-5 backdrop-blur-xl">
          <p className="text-sm text-muted">Saved engagement entries</p>
          <p className="mt-2 text-3xl font-semibold text-foreground">{storedEngagement.length}</p>
        </div>
      </section>

      <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-4xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-accent">Admin dashboard</p>
            <h2 className="mt-3 text-3xl font-semibold text-foreground">Manage local project overrides</h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              This dashboard persists curated project data in browser storage for quick content iteration. For team workflows, wire the included Contentful adapter to a managed CMS.
            </p>
          </div>
          <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-muted">
            CMS {cmsConfigured ? "connected" : "optional"}
          </span>
        </div>

        <div className="mt-8 grid gap-4">
          <label className="grid gap-2 text-sm text-muted">
            Title
            <input
              value={draft.title}
              onChange={(event) => setDraft({ ...draft, title: event.target.value })}
              className="rounded-2xl border border-white/10 bg-background/70 px-4 py-3 text-foreground outline-none focus:border-accent"
            />
          </label>
          <label className="grid gap-2 text-sm text-muted">
            Description
            <textarea
              value={draft.description}
              onChange={(event) => setDraft({ ...draft, description: event.target.value })}
              className="min-h-32 rounded-3xl border border-white/10 bg-background/70 px-4 py-3 text-foreground outline-none focus:border-accent"
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm text-muted">
              Categories (comma separated)
              <input
                value={draft.categories.join(", ")}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    categories: event.target.value.split(",").map((item) => item.trim()),
                  })
                }
                className="rounded-2xl border border-white/10 bg-background/70 px-4 py-3 text-foreground outline-none focus:border-accent"
              />
            </label>
            <label className="grid gap-2 text-sm text-muted">
              Stack (comma separated)
              <input
                value={draft.stack.join(", ")}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    stack: event.target.value.split(",").map((item) => item.trim()),
                  })
                }
                className="rounded-2xl border border-white/10 bg-background/70 px-4 py-3 text-foreground outline-none focus:border-accent"
              />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm text-muted">
              Image path
              <input
                value={draft.image}
                onChange={(event) => setDraft({ ...draft, image: event.target.value })}
                className="rounded-2xl border border-white/10 bg-background/70 px-4 py-3 text-foreground outline-none focus:border-accent"
              />
            </label>
            <label className="grid gap-2 text-sm text-muted">
              GitHub URL
              <input
                value={draft.githubUrl}
                onChange={(event) => setDraft({ ...draft, githubUrl: event.target.value })}
                className="rounded-2xl border border-white/10 bg-background/70 px-4 py-3 text-foreground outline-none focus:border-accent"
              />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
            <label className="grid gap-2 text-sm text-muted">
              Live demo URL
              <input
                value={draft.liveUrl}
                onChange={(event) => setDraft({ ...draft, liveUrl: event.target.value })}
                className="rounded-2xl border border-white/10 bg-background/70 px-4 py-3 text-foreground outline-none focus:border-accent"
              />
            </label>
            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-background/70 px-4 py-3 text-sm text-muted">
              <input
                type="checkbox"
                checked={draft.featured}
                onChange={(event) => setDraft({ ...draft, featured: event.target.checked })}
                className="h-4 w-4 rounded border-white/20 bg-background/70"
              />
              Featured project
            </label>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button type="button" onClick={saveProject} className="inline-flex items-center rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-foreground">
              <Plus className="mr-2 h-4 w-4" />
              Save project
            </button>
            <button type="button" onClick={exportProjects} className="inline-flex items-center rounded-full border border-white/10 px-5 py-3 text-sm text-muted transition hover:border-white/20 hover:text-foreground">
              <Download className="mr-2 h-4 w-4" />
              Export JSON
            </button>
            <button type="button" onClick={resetProjects} className="inline-flex items-center rounded-full border border-white/10 px-5 py-3 text-sm text-muted transition hover:border-white/20 hover:text-foreground">
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset defaults
            </button>
          </div>
        </div>
      </section>

      <section className="rounded-4xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl">
        <h3 className="text-2xl font-semibold text-foreground">Current projects</h3>
        <div className="mt-6 space-y-4">
          {storedValue.map((project) => (
            <article key={project.id} className="rounded-3xl border border-white/10 bg-background/70 p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h4 className="text-lg font-medium text-foreground">{project.title}</h4>
                  <p className="mt-2 text-sm leading-7 text-muted">{project.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span key={item} className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeProject(project.id)}
                  className="inline-flex items-center rounded-full border border-white/10 px-4 py-2 text-sm text-muted transition hover:border-red-300/30 hover:text-red-200"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
      </div>

      <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-4xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-accent">Blog manager</p>
              <h2 className="mt-3 text-3xl font-semibold text-foreground">Manage local blog content</h2>
              <p className="mt-3 text-sm leading-7 text-muted">
                Create local blog posts that appear on the portfolio blog and preview sections in this browser. Markdown posts from the repository remain published separately.
              </p>
            </div>
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-muted">
              {blogPosts.length} markdown posts
            </span>
          </div>

          <div className="mt-8 grid gap-4">
            <label className="grid gap-2 text-sm text-muted">
              Title
              <input
                value={blogDraft.title}
                onChange={(event) => setBlogDraft({ ...blogDraft, title: event.target.value })}
                className="rounded-2xl border border-white/10 bg-background/70 px-4 py-3 text-foreground outline-none focus:border-accent"
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-muted">
                Category
                <input
                  value={blogDraft.category}
                  onChange={(event) => setBlogDraft({ ...blogDraft, category: event.target.value })}
                  className="rounded-2xl border border-white/10 bg-background/70 px-4 py-3 text-foreground outline-none focus:border-accent"
                />
              </label>
              <label className="grid gap-2 text-sm text-muted">
                Publish date
                <input
                  type="date"
                  value={blogDraft.date}
                  onChange={(event) => setBlogDraft({ ...blogDraft, date: event.target.value })}
                  className="rounded-2xl border border-white/10 bg-background/70 px-4 py-3 text-foreground outline-none focus:border-accent"
                />
              </label>
            </div>
            <label className="grid gap-2 text-sm text-muted">
              Cover image path
              <input
                value={blogDraft.coverImage}
                onChange={(event) => setBlogDraft({ ...blogDraft, coverImage: event.target.value })}
                className="rounded-2xl border border-white/10 bg-background/70 px-4 py-3 text-foreground outline-none focus:border-accent"
              />
            </label>
            <label className="grid gap-2 text-sm text-muted">
              Excerpt (optional)
              <textarea
                value={blogDraft.excerpt}
                onChange={(event) => setBlogDraft({ ...blogDraft, excerpt: event.target.value })}
                className="min-h-24 rounded-3xl border border-white/10 bg-background/70 px-4 py-3 text-foreground outline-none focus:border-accent"
              />
            </label>
            <label className="grid gap-2 text-sm text-muted">
              Content
              <textarea
                value={blogDraft.content}
                onChange={(event) => setBlogDraft({ ...blogDraft, content: event.target.value })}
                className="min-h-48 rounded-3xl border border-white/10 bg-background/70 px-4 py-3 text-foreground outline-none focus:border-accent"
                placeholder="Write the post content here. Paragraph breaks will be preserved."
              />
            </label>

            <div className="flex flex-wrap gap-3 pt-2">
              <button type="button" onClick={saveBlogPost} className="inline-flex items-center rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-foreground">
                <Plus className="mr-2 h-4 w-4" />
                Save blog post
              </button>
              <button type="button" onClick={exportBlogPosts} className="inline-flex items-center rounded-full border border-white/10 px-5 py-3 text-sm text-muted transition hover:border-white/20 hover:text-foreground">
                <Download className="mr-2 h-4 w-4" />
                Export blog JSON
              </button>
              <button type="button" onClick={resetBlogPosts} className="inline-flex items-center rounded-full border border-white/10 px-5 py-3 text-sm text-muted transition hover:border-white/20 hover:text-foreground">
                <RotateCcw className="mr-2 h-4 w-4" />
                Clear local blog posts
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-4xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl">
          <h3 className="text-2xl font-semibold text-foreground">Current local blog posts</h3>
          <div className="mt-6 space-y-4">
            {storedBlogPosts.length ? (
              storedBlogPosts.map((post) => (
                <article key={post.slug} className="rounded-3xl border border-white/10 bg-background/70 p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h4 className="text-lg font-medium text-foreground">{post.title}</h4>
                      <p className="mt-2 text-xs uppercase tracking-[0.22em] text-muted">{post.category} · {formatDate(post.date)} · {post.readingTime} min read</p>
                      <p className="mt-3 text-sm leading-7 text-muted">{post.excerpt}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeBlogPost(post.slug)}
                      className="inline-flex items-center rounded-full border border-white/10 px-4 py-2 text-sm text-muted transition hover:border-red-300/30 hover:text-red-200"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-3xl border border-dashed border-white/10 bg-background/50 p-5 text-sm text-muted">
                No local blog posts yet. Create one on the left and it will appear in the blog list for this browser.
              </div>
            )}
          </div>
        </section>
      </div>

      <section className="rounded-4xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-accent">Engagement</p>
            <h2 className="mt-3 text-3xl font-semibold text-foreground">Saved likes, comments, and favorites</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">
              These entries are stored locally in this browser. They reflect likes, favorite saves, and comments created on blog post pages.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={exportEngagement} className="inline-flex items-center rounded-full border border-white/10 px-5 py-3 text-sm text-muted transition hover:border-white/20 hover:text-foreground">
              <Download className="mr-2 h-4 w-4" />
              Export engagement JSON
            </button>
            <button type="button" onClick={resetEngagement} className="inline-flex items-center rounded-full border border-white/10 px-5 py-3 text-sm text-muted transition hover:border-white/20 hover:text-foreground">
              <RotateCcw className="mr-2 h-4 w-4" />
              Clear saved engagement
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {storedEngagement.length ? (
            storedEngagement.map((entry) => (
              <article key={entry.slug} className="rounded-3xl border border-white/10 bg-background/70 p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h4 className="text-lg font-medium text-foreground">{entry.title}</h4>
                    <p className="mt-2 text-xs uppercase tracking-[0.22em] text-muted">/{entry.slug}</p>
                    <div className="mt-4 flex flex-wrap gap-2 text-sm text-muted">
                      <span className="rounded-full border border-white/10 px-3 py-1">{entry.likes} likes</span>
                      <span className="rounded-full border border-white/10 px-3 py-1">{entry.favorited ? "Saved favorite" : "Not favorited"}</span>
                      <span className="rounded-full border border-white/10 px-3 py-1">{entry.comments.length} comments</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => clearEngagementEntry(entry.slug)}
                    className="inline-flex items-center rounded-full border border-white/10 px-4 py-2 text-sm text-muted transition hover:border-red-300/30 hover:text-red-200"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove
                  </button>
                </div>

                <div className="mt-5 space-y-3">
                  {entry.comments.length ? (
                    entry.comments.slice(0, 3).map((comment) => (
                      <div key={comment.id} className="rounded-2xl border border-white/10 p-4 text-sm text-muted">
                        <p className="font-medium text-foreground">{comment.author}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">{formatDate(comment.createdAt)}</p>
                        <p className="mt-2 leading-7">{comment.message}</p>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-dashed border-white/10 p-4 text-sm text-muted">
                      No comments saved for this post yet.
                    </div>
                  )}
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-3xl border border-dashed border-white/10 bg-background/50 p-5 text-sm text-muted">
              No saved engagement yet. Likes, comments, and favorites will show up here after they are created on a blog post page.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
