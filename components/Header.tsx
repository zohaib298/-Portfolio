"use client";

import { useState } from "react";
import Link from "next/link";
import { useMotionValueEvent, useScroll } from "motion/react";
import Logo from "@/components/Logo";
import MobileNav from "@/components/MobileNav";
import CommandPaletteTrigger from "@/components/CommandPaletteTrigger";
import ThemeToggle from "@/components/ThemeToggle";

const SCROLL_THRESHOLD = 80;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > SCROLL_THRESHOLD);
  });

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-line bg-base/70 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-6 md:px-12 lg:px-20">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          <Link
            href="/blog"
            className="rounded-full px-3 py-2 text-sm text-muted transition-colors duration-300 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            Blog
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <CommandPaletteTrigger />
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
