import type { PortfolioProject } from "@/lib/portfolio";
import { slugify } from "@/lib/utils";

type ContentfulEntry = {
  fields?: {
    title?: string;
    summary?: string;
    categories?: string[];
    stack?: string[];
    githubUrl?: string;
    liveUrl?: string;
    featured?: boolean;
    imageUrl?: string;
  };
};

export function isCmsConfigured() {
  return Boolean(process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN);
}

export async function getCmsProjects(): Promise<PortfolioProject[]> {
  if (!isCmsConfigured()) {
    return [];
  }

  const space = process.env.CONTENTFUL_SPACE_ID;
  const token = process.env.CONTENTFUL_ACCESS_TOKEN;
  const environment = process.env.CONTENTFUL_ENVIRONMENT ?? "master";

  try {
    const response = await fetch(
      `https://cdn.contentful.com/spaces/${space}/environments/${environment}/entries?content_type=project`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 3600 },
      },
    );

    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as { items?: ContentfulEntry[] };

    return (payload.items ?? [])
      .map((entry) => {
        const title = entry.fields?.title;
        const summary = entry.fields?.summary;

        if (!title || !summary) {
          return null;
        }

        return {
          id: slugify(title),
          title,
          description: summary,
          image: entry.fields?.imageUrl ?? "/projects/project-analytics.svg",
          categories: entry.fields?.categories ?? ["CMS"],
          stack: entry.fields?.stack ?? ["Contentful"],
          githubUrl: entry.fields?.githubUrl ?? "https://github.com",
          liveUrl: entry.fields?.liveUrl ?? "https://www.contentful.com/",
          featured: entry.fields?.featured ?? false,
        } satisfies PortfolioProject;
      })
      .filter((entry): entry is PortfolioProject => Boolean(entry));
  } catch {
    return [];
  }
}
