import { Reveal } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-24 md:px-12 lg:px-20">
      <Reveal className="max-w-2xl">
        <SectionHeading eyebrow="About Me" title="A little about how I work" number="01" />
        <p className="mt-6 text-base leading-relaxed text-muted">
          I&apos;m a full stack web developer who enjoys building complete
          products end-to-end — from designing the API and data layer to
          shipping a clean, responsive interface on top of it. I care about
          writing code that&apos;s simple to read and easy to maintain, and
          I&apos;m always looking for the next project to sharpen that on.
        </p>
        <div id="resume" className="mt-8">
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-white transition-colors duration-300 hover:border-accent hover:text-accent active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
          >
            Download Resume
          </a>
        </div>
      </Reveal>
    </section>
  );
}
