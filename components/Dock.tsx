"use client";

import { dockItems } from "@/lib/nav";

function scrollToSection(e: React.MouseEvent, href: string) {
  e.preventDefault();
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

export default function Dock() {
  return (
    <>
      {/* Desktop: fixed vertical dock on the right edge */}
      <nav
        aria-label="Section navigation"
        className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-2 rounded-full bg-surface/60 p-2 shadow-[0_0_30px_rgba(0,0,0,0.45)] ring-1 ring-white/5 backdrop-blur-md md:flex"
      >
        {dockItems.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            onClick={(e) => scrollToSection(e, href)}
            aria-label={label}
            className="group relative flex h-11 w-11 items-center justify-center rounded-full text-muted transition-all duration-300 hover:scale-110 hover:bg-accent/10 hover:text-accent active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            <Icon className="h-5 w-5" strokeWidth={1.75} />
            <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-surface px-3 py-1.5 text-xs text-white opacity-0 shadow-lg ring-1 ring-white/5 transition-opacity duration-200 group-hover:opacity-100">
              {label}
            </span>
          </a>
        ))}
      </nav>

      {/* Mobile: fixed bottom bar */}
      <nav
        aria-label="Section navigation"
        className="fixed inset-x-4 bottom-4 z-50 flex items-center justify-around rounded-full bg-surface/80 px-2 py-2 shadow-[0_0_30px_rgba(0,0,0,0.45)] ring-1 ring-white/5 backdrop-blur-md md:hidden"
      >
        {dockItems.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            onClick={(e) => scrollToSection(e, href)}
            aria-label={label}
            className="flex h-10 w-10 items-center justify-center rounded-full text-muted transition-all duration-300 active:scale-[0.97] active:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </a>
        ))}
      </nav>
    </>
  );
}
