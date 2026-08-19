"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SocialRow from "@/components/SocialRow";

const inputClasses =
  "w-full rounded-xl bg-surface/80 px-4 py-3 text-sm text-white placeholder:text-muted/70 ring-1 ring-white/10 outline-none transition-shadow focus:ring-2 focus:ring-accent";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative mx-auto max-w-7xl scroll-mt-24 px-6 py-24 md:px-12 lg:px-20">
      <Reveal className="max-w-2xl">
        <SectionHeading eyebrow="Contact" title="Let's build something together" number="04" />
        <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
          Have a project in mind? Send a few details and I&apos;ll get back
          to you shortly.
        </p>
      </Reveal>

      <Reveal delay={0.15} className="mt-12 max-w-xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input type="text" name="name" placeholder="Name" required className={inputClasses} />
          <input type="email" name="email" placeholder="Email" required className={inputClasses} />
          <textarea
            name="message"
            placeholder="Message"
            required
            rows={5}
            className={`${inputClasses} resize-none`}
          />
          <button
            type="submit"
            className="mt-2 self-start rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:scale-105 hover:shadow-[0_0_30px_rgba(232,67,43,0.45)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-base"
          >
            {submitted ? "Sent — thank you!" : "Send Message"}
          </button>
        </form>

        <SocialRow className="mt-10" />
      </Reveal>
    </section>
  );
}
