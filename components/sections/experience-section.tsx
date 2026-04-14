import { experiences } from "@/lib/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function ExperienceSection() {
  return (
    <section id="experience" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <Reveal>
          <SectionHeading
            eyebrow="Experience"
            title="A track record across product teams, client work, and end-to-end delivery."
            description="From MVPs to mature product platforms, these are the roles that shaped the engineering perspective behind the portfolio."
          />
        </Reveal>

        <div className="relative grid gap-6 before:absolute before:left-4.25 before:top-4 before:h-[calc(100%-2rem)] before:w-px before:bg-white/10 sm:before:left-6">
          {experiences.map((experience, index) => (
            <Reveal key={`${experience.company}-${experience.role}`} delay={index * 0.07}>
              <article className="relative rounded-4xl border border-white/10 bg-white/6 p-6 pl-16 backdrop-blur-xl sm:pl-20">
                <span className="absolute left-2.75 top-8 h-3.5 w-3.5 rounded-full border-4 border-background bg-accent sm:left-5" />
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.28em] text-accent">{experience.period}</p>
                    <h3 className="mt-3 text-2xl font-semibold text-foreground">{experience.role}</h3>
                    <p className="mt-2 text-sm text-muted">
                      {experience.company} · {experience.location}
                    </p>
                  </div>
                  <p className="max-w-lg text-sm leading-7 text-muted">{experience.summary}</p>
                </div>
                <div className="mt-6 grid gap-3 md:grid-cols-3">
                  {experience.achievements.map((achievement) => (
                    <div key={achievement} className="rounded-3xl border border-white/10 bg-background/65 p-4 text-sm leading-7 text-muted">
                      {achievement}
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
