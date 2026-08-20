"use client";

import RotatingBadge from "@/components/RotatingBadge";
import ConstellationBackground from "@/components/ConstellationBackground";
import RadarGraphic from "@/components/RadarGraphic";
import SocialRow from "@/components/SocialRow";
import Portrait from "@/components/Portrait";
import { StaggerGroup, StaggerItem } from "@/components/Reveal";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col justify-center overflow-x-clip px-6 pt-32 pb-0 md:px-12 lg:px-20"
    >
      {/* Background layer: constellation pattern, clipped so it never bleeds */}
      <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <ConstellationBackground />
      </div>

      {/* Top-right social icons — sits below the fixed Header's ~88px band
          (py-6 padding + h-10 controls) so it never overlaps the header's
          own right-side controls (search trigger, theme toggle). */}
      <SocialRow className="absolute right-6 top-28 z-20 hidden sm:flex md:right-12 lg:right-20" />

      {/* On-load entrance: eyebrow, headline, intro, badge row, then photo — in sequence */}
      <StaggerGroup
        trigger="mount"
        stagger={0.12}
        className="mx-auto grid w-full max-w-7xl grid-cols-1 items-end gap-16 lg:grid-cols-2"
      >
        {/* Left: copy */}
        <div className="flex flex-col gap-6 pb-16 lg:pb-32">
          <StaggerItem>
            <p className="text-xs uppercase tracking-[0.35em] text-muted">
              Full Stack Web Developer
            </p>
          </StaggerItem>

          <StaggerItem>
            <h1 className="text-display-sm font-bold tracking-tight text-ink sm:text-display-md md:text-display-lg">
              Transforming <span className="text-accent">Ideas</span> Into
              <br />
              <span className="text-accent">Digital Reality</span>
            </h1>
          </StaggerItem>

          <StaggerItem>
            <p className="max-w-md text-base leading-relaxed text-muted">
              I build fast, reliable, end-to-end web applications, from
              database and API design to polished, high-craft frontends. Swap
              this in with a short line about your focus, experience, and
              what you love to build.
            </p>
          </StaggerItem>

          <StaggerItem className="mt-4 flex items-center gap-6">
            <RotatingBadge />
            <span className="hidden text-sm text-muted sm:block">
              Scroll to see my work
            </span>
          </StaggerItem>
        </div>

        {/* Right: profile photo, side-by-side on desktop, stacked + centered on mobile */}
        <StaggerItem className="relative flex justify-center pb-16 lg:justify-end lg:pb-32">
          <div className="relative w-65 sm:w-75 md:w-85 lg:w-95">
            {/* ambient radial glow behind photo — soft falloff, not a hard shape */}
            <div className="absolute inset-x-0 top-10 -z-10 mx-auto h-96 w-96 bg-[radial-gradient(circle,rgba(232,67,43,0.2)_0%,rgba(232,67,43,0)_70%)] animate-pulse-glow" />
            {/* radar line-art behind photo */}
            <RadarGraphic className="absolute left-1/2 top-1/2 -z-10 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 opacity-70" />
            <Portrait />
          </div>
        </StaggerItem>
      </StaggerGroup>
    </section>
  );
}
