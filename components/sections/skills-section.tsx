"use client";

import { FaAws } from "react-icons/fa6";
import {
  SiDocker,
  SiFigma,
  SiFramer,
  SiGraphql,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiThreedotjs,
} from "react-icons/si";

import { skills } from "@/lib/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const iconMap = {
  "AWS": FaAws,
  "Docker": SiDocker,
  "Figma": SiFigma,
  "Framer Motion": SiFramer,
  "GraphQL": SiGraphql,
  "Next.js": SiNextdotjs,
  "Node.js": SiNodedotjs,
  "PostgreSQL": SiPostgresql,
  "React": SiReact,
  "Tailwind CSS": SiTailwindcss,
  "Three.js": SiThreedotjs,
  "JavaScript": SiJavascript,
};

const groupedSkills = Object.entries(
  skills.reduce<Record<string, typeof skills>>((collection, skill) => {
    collection[skill.category] ??= [];
    collection[skill.category].push(skill);
    return collection;
  }, {}),
);

export function SkillsSection() {
  return (
    <section id="skills" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <Reveal>
          <SectionHeading
            eyebrow="Skills"
            title="High-confidence tooling across product, platform, and motion-rich frontend work."
            description="A pragmatic stack built for speed, maintainability, and strong user-facing outcomes."
          />
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {groupedSkills.map(([category, categorySkills], categoryIndex) => (
            <Reveal
              key={category}
              delay={categoryIndex * 0.06}
              className="rounded-4xl border border-white/10 bg-white/6 p-6 backdrop-blur-xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-medium text-foreground">{category}</h3>
                <span className="text-xs uppercase tracking-[0.28em] text-muted">{categorySkills.length} tools</span>
              </div>
              <div className="space-y-5">
                {categorySkills.map((skill) => {
                  const Icon = iconMap[skill.name as keyof typeof iconMap];

                  return (
                    <div key={skill.name} className="space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-background/75 text-accent">
                            {Icon ? <Icon className="h-5 w-5" /> : null}
                          </span>
                          <span className="text-sm font-medium text-foreground">{skill.name}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
