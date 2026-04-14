"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { ArrowUpRight, Github, Layers3 } from "lucide-react";

import { useLocalStorage } from "@/hooks/use-local-storage";
import type { PortfolioProject } from "@/lib/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

type ProjectsSectionProps = {
  projects: PortfolioProject[];
};

export function ProjectsSection({ projects: initialProjects }: ProjectsSectionProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const { ready, storedValue } = useLocalStorage<PortfolioProject[]>("portfolio.projects", initialProjects);
  const projects = ready && storedValue.length ? storedValue : initialProjects;
  const filters = ["All", ...new Set(projects.flatMap((project) => project.categories))];
  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.categories.includes(activeFilter));

  return (
    <section id="projects" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <Reveal>
          <SectionHeading
            eyebrow="Projects"
            title="Selected projects"
            description="A concise set of production-focused work."
          />
        </Reveal>

        <Reveal className="flex flex-wrap gap-3" delay={0.06}>
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-4 py-2 text-sm transition ${
                activeFilter === filter
                  ? "bg-accent text-accent-foreground"
                  : "border border-white/10 bg-transparent text-muted hover:border-white/20 hover:text-foreground"
              }`}
            >
              {filter}
            </button>
          ))}
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.06} className="group h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-background transition duration-200 hover:border-white/20">
                <div className="relative aspect-16/10 overflow-hidden border-b border-white/10">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-background/70 px-3 py-1 text-xs uppercase tracking-[0.25em] text-muted">
                      <Layers3 className="h-3.5 w-3.5" />
                      {project.categories[0]}
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl font-semibold text-foreground">{project.title}</h3>
                  <p className="mt-4 flex-1 text-sm leading-7 text-muted">{project.description}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                      <span key={item} className="rounded-full border border-white/10 px-3 py-1 text-xs text-foreground/80">
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-muted transition hover:border-white/20 hover:text-foreground"
                    >
                      <Github className="h-4 w-4" />
                      Code
                    </Link>
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      className="inline-flex items-center gap-2 rounded-full border border-accent px-4 py-2 text-sm font-medium text-accent transition hover:bg-accent/10"
                    >
                      Live
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
