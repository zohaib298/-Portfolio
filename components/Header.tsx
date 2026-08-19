"use client";

import { useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import Logo from "@/components/Logo";

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
        scrolled ? "border-white/5 bg-base/70 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center px-6 py-6 md:px-12 lg:px-20">
        <Logo />
      </div>
    </header>
  );
}
