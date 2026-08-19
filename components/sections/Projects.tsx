import { Hammer } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";
import { socialItems } from "@/lib/data";
import { STAGGER } from "@/lib/motion";

const github = socialItems.find((item) => item.label === "GitHub");

export default function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-24 md:px-12 lg:px-20">
      <Reveal>
        <SectionHeading eyebrow="Projects" title="Selected work" number="03" />
      </Reveal>

      {projects.length === 0 ? (
        <Reveal
          delay={0.15}
          className="mt-16 flex flex-col items-center gap-4 rounded-2xl bg-surface/60 px-6 py-20 text-center ring-1 ring-white/5"
        >
          <Hammer className="h-8 w-8 text-accent" strokeWidth={1.75} />
          <h3 className="text-xl font-semibold text-white">Projects coming soon</h3>
          <p className="max-w-md text-sm leading-relaxed text-muted">
            I&apos;m actively building out real case studies for this section —
            new projects will be added regularly. Check back soon.
          </p>
          {github && (
            <a
              href={github.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={github.label}
              className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-white transition-colors duration-300 hover:border-accent hover:text-accent active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
            >
              View GitHub
            </a>
          )}
        </Reveal>
      ) : (
        <StaggerGroup
          stagger={STAGGER}
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project) => (
            <StaggerItem key={project.title}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      )}
    </section>
  );
}
