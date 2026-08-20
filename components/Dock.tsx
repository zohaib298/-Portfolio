"use client";

import { dockItems } from "@/lib/nav";

function scrollToSection(e: React.MouseEvent, href: string) {
  e.preventDefault();
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
}

/** Desktop-only: fixed vertical dock on the right edge. Mobile nav lives in MobileNav's drawer. */
export default function Dock() {
  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-2 rounded-full bg-surface/60 p-2 shadow-elevated ring-1 ring-line backdrop-blur-md md:flex"
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
          <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-surface px-3 py-1.5 text-xs text-ink opacity-0 shadow-lg ring-1 ring-line transition-opacity duration-200 group-hover:opacity-100">
            {label}
          </span>
        </a>
      ))}
    </nav>
  );
}
