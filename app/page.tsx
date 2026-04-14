import { AboutSection } from "@/components/sections/about-section";
import { BlogPreviewSection } from "@/components/sections/blog-preview-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { getAllBlogPosts } from "@/lib/blog";
import { getCmsProjects } from "@/lib/cms";
import { projects, type PortfolioProject } from "@/lib/portfolio";

function mergeProjects(externalProjects: PortfolioProject[]) {
  const projectMap = new Map<string, PortfolioProject>();

  [...externalProjects, ...projects].forEach((project) => {
    projectMap.set(project.id, project);
  });

  return Array.from(projectMap.values()).sort((left, right) => Number(right.featured) - Number(left.featured));
}

export default async function HomePage() {
  const [blogPosts, cmsProjects] = await Promise.all([
    getAllBlogPosts(),
    getCmsProjects(),
  ]);

  return (
    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection projects={mergeProjects(cmsProjects)} />
      <ExperienceSection />
      <BlogPreviewSection posts={blogPosts} />
      <ContactSection />
    </main>
  );
}
