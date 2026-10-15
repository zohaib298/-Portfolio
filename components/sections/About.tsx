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
            <p className="mt-2 max-w-prose text-base leading-relaxed text-muted">
              I build and run a production ERP for a fire safety trading
              business, and the automations around it — n8n workflows and AI
              agents that take over the repetitive work. Alongside that I build
              websites and Chrome extensions. Because I handle operations in the
              same business, I see where the real friction is before I write
              anything.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">
              Currently working on
            </h3>
            <p className="mt-2 max-w-prose text-base leading-relaxed text-muted">
              Extending Auto Quote, the engine that turns a raw customer inquiry
              into a finished quotation, and adding AI agents to the ERP that
              handle email and inventory without anyone touching them.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink">
              What I&apos;m looking for
            </h3>
            <p className="mt-2 max-w-prose text-base leading-relaxed text-muted">
              A developer or automation role in Rawalpindi or Islamabad where I
              can own real problems end to end — ideally somewhere that wants
              manual processes turned into working software.
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
