import type { Metadata } from "next";

import { AdminDashboard } from "@/components/sections/admin-dashboard";
import { getAllBlogPosts } from "@/lib/blog";
import { getCmsProjects, isCmsConfigured } from "@/lib/cms";
import { projects } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Admin",
  description: "Local content management surface for project curation and CMS status.",
};

export default async function AdminPage() {
  const [cmsProjects = [], blogPosts = []] = await Promise.all([getCmsProjects(), getAllBlogPosts()]);
  const mergedProjects = [...cmsProjects, ...projects.filter((project) => !cmsProjects.some((item) => item.id === project.id))];

  return (
    <main className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs uppercase tracking-[0.35em] text-accent">Admin</p>
          <h1 className="text-balance text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
            Project management and CMS integration surface.
          </h1>
          <p className="text-lg leading-8 text-muted">
            Use this route to prototype project and blog edits locally, review saved engagement data, and confirm whether Contentful-backed project syncing is configured in the environment.
          </p>
        </div>
        <AdminDashboard projects={mergedProjects} blogPosts={blogPosts} cmsConfigured={isCmsConfigured()} />
      </div>
    </main>
  );
}
