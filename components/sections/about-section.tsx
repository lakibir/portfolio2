import { aboutHighlights, siteConfig, technologies } from "@/lib/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function AboutSection() {
  return (
    <section id="about" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        <Reveal>
          <SectionHeading
            eyebrow="About"
            title="Full-stack execution with product taste and delivery discipline."
            description={siteConfig.description}
          />
        </Reveal>

        <div className="grid gap-6">
          <Reveal className="rounded-4xl border border-white/10 bg-white/6 p-7 backdrop-blur-xl" delay={0.05}>
            <p className="text-base leading-8 text-muted">
              I work across frontend, backend, and platform layers with an emphasis on accessible interfaces, resilient architecture, and maintainable code. The outcome matters more than the stack, but I care deeply about craft, clarity, and performance.
            </p>
          </Reveal>

          <Reveal className="grid gap-4 md:grid-cols-3" delay={0.1}>
            {aboutHighlights.map((highlight) => (
              <div key={highlight} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 text-sm leading-7 text-muted backdrop-blur-xl">
                {highlight}
              </div>
            ))}
          </Reveal>

          <Reveal className="rounded-4xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl" delay={0.16}>
            <p className="text-sm uppercase tracking-[0.3em] text-accent">Core toolkit</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-white/10 bg-background/70 px-4 py-2 text-sm text-foreground"
                >
                  {technology}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
