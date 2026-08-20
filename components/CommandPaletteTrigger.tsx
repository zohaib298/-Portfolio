"use client";

import { Search } from "lucide-react";

/** Visible ⌘K trigger, rendered in Header. Opens the CommandPalette (mounted
 *  once in the root layout) via a window event — see CommandPalette.tsx. */
export default function CommandPaletteTrigger() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("command-palette:open"))}
      aria-label="Open command palette"
      className="hidden h-10 items-center gap-2 rounded-full bg-line px-4 text-sm text-muted transition-colors duration-300 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 md:flex"
    >
      <Search className="h-4 w-4" strokeWidth={1.75} />
      Search
      <kbd className="rounded-md bg-surface px-1.5 py-0.5 font-sans text-[0.7rem] text-muted ring-1 ring-line-strong">
        ⌘K
      </kbd>
    </button>
  );
}
