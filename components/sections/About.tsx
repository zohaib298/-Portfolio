import { Reveal } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-24 md:px-12 lg:px-20">
      <Reveal className="max-w-2xl">
        <SectionHeading eyebrow="About Me" title="A little about how I work" number="01" />

        <div className="mt-8 flex flex-col gap-8">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">Bio</h3>
            {/* TODO: Rewrite this in your own words — background, what you do, what drives you. */}
            <p className="mt-2 max-w-prose text-base leading-relaxed text-muted">
              I&apos;m a full stack web developer who enjoys building complete
              products end-to-end — from designing the API and data layer to
              shipping a clean, responsive interface on top of it. I care about
              writing code that&apos;s simple to read and easy to maintain.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">
              Currently working on
            </h3>
            {/* TODO: Replace with what you're actually building right now. */}
            <p className="mt-2 max-w-prose text-base leading-relaxed text-muted">
              Sharpening my full-stack skills by shipping real projects
              end-to-end, from data modeling to deployment.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">
              What I&apos;m looking for
            </h3>
            {/* TODO: Replace with the kind of role/work/collaboration you actually want. */}
            <p className="mt-2 max-w-prose text-base leading-relaxed text-muted">
              Opportunities to work on products where I can own a feature
              end-to-end and grow alongside a team that cares about craft.
            </p>
          </div>
        </div>

        <div id="resume" className="mt-8">
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm font-medium text-ink transition-colors duration-300 hover:border-accent hover:text-accent active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
          >
            Download Resume
          </a>
        </div>
      </Reveal>
    </section>
  );
}
