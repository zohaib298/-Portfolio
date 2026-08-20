"use client";

import { useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Search, Moon, Sun, ArrowRight } from "lucide-react";
import { dockItems } from "@/lib/nav";
import { projects, socialItems } from "@/lib/data";
import { DURATION, EASE, withReducedMotion } from "@/lib/motion";

type PaletteItem = {
  id: string;
  label: string;
  group: string;
  icon: ComponentType<{ className?: string }>;
  perform: (ctx: { router: ReturnType<typeof useRouter>; pathname: string }) => void;
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.fast, ease: EASE } },
};

const panelVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: { duration: DURATION.fast, ease: EASE } },
};

function goToSection(href: string, router: ReturnType<typeof useRouter>, pathname: string) {
  if (pathname === "/") {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  } else {
    router.push(`/${href}`);
  }
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const triggerFocusRef = useRef<Element | null>(null);
  const reduced = useReducedMotion();
  const router = useRouter();
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  const items: PaletteItem[] = useMemo(() => {
    const nav: PaletteItem[] = dockItems.map(({ label, href, icon }) => ({
      id: `nav-${href}`,
      label,
      group: "Navigate",
      icon,
      perform: ({ router, pathname }) => goToSection(href, router, pathname),
    }));

    const blog: PaletteItem = {
      id: "nav-blog",
      label: "Blog",
      group: "Navigate",
      icon: ArrowRight,
      perform: ({ router }) => router.push("/blog"),
    };

    const projectItems: PaletteItem[] = projects.map((project) => ({
      id: `project-${project.slug}`,
      label: project.title,
      group: "Projects",
      icon: ArrowRight,
      perform: ({ router }) => router.push(`/projects/${project.slug}`),
    }));

    const socials: PaletteItem[] = socialItems.map(({ label, href, icon, external }) => ({
      id: `social-${label}`,
      label: href.startsWith("mailto:") ? `${label} (copy address)` : label,
      group: "Connect",
      icon,
      perform: () => {
        if (href.startsWith("mailto:")) {
          // mailto: silently no-ops without a default mail client — copy is the reliable path.
          navigator.clipboard?.writeText(href.replace(/^mailto:/, "")).catch(() => {});
          window.location.href = href;
        } else if (external) {
          window.open(href, "_blank", "noopener,noreferrer");
        } else {
          window.location.href = href;
        }
      },
    }));

    const theme: PaletteItem = {
      id: "action-theme",
      label: resolvedTheme === "light" ? "Switch to dark theme" : "Switch to light theme",
      group: "Actions",
      icon: resolvedTheme === "light" ? Moon : Sun,
      perform: () => setTheme(resolvedTheme === "light" ? "dark" : "light"),
    };

    return [...nav, blog, ...projectItems, ...socials, theme];
  }, [resolvedTheme, setTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) => item.label.toLowerCase().includes(q) || item.group.toLowerCase().includes(q)
    );
  }, [items, query]);

  const close = () => setOpen(false);

  const openPalette = () => {
    triggerFocusRef.current = document.activeElement;
    setQuery("");
    setActiveIndex(0);
    setOpen(true);
  };

  const select = (item: PaletteItem) => {
    close();
    item.perform({ router, pathname });
  };

  // Global open shortcut: Cmd/Ctrl+K, plus a custom event so the visible
  // trigger button (rendered in Header, away from this fixed-position root)
  // can open the same palette instance.
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) {
          close();
        } else {
          openPalette();
        }
      }
    };
    const handleOpenEvent = () => openPalette();
    document.addEventListener("keydown", handleGlobalKeyDown);
    window.addEventListener("command-palette:open", handleOpenEvent);
    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown);
      window.removeEventListener("command-palette:open", handleOpenEvent);
    };
  }, [open]);

  // Focus input, lock scroll, trap focus while open.
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        (triggerFocusRef.current as HTMLElement | null)?.focus?.();
        return;
      }
      if (e.key === "Tab") {
        // Single-field dialog: keep focus pinned to the input.
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = filtered[activeIndex];
      if (item) select(item);
    }
  };

  let runningIndex = -1;

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={withReducedMotion(!!reduced, overlayVariants)}
              className="fixed inset-0 z-90 bg-base/80 backdrop-blur-sm"
              onClick={close}
              aria-hidden="true"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={withReducedMotion(!!reduced, panelVariants)}
              className="fixed inset-x-4 top-24 z-100 mx-auto max-w-xl overflow-hidden rounded-2xl bg-surface shadow-elevated ring-1 ring-line-strong sm:inset-x-0"
            >
              <div className="flex items-center gap-3 border-b border-line px-4 py-3">
                <Search className="h-4 w-4 shrink-0 text-muted" strokeWidth={1.75} />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setActiveIndex(0);
                  }}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Search pages, projects, actions…"
                  aria-label="Search"
                  role="combobox"
                  aria-expanded="true"
                  aria-controls="command-palette-list"
                  aria-activedescendant={
                    filtered[activeIndex] ? `command-item-${filtered[activeIndex].id}` : undefined
                  }
                  className="w-full bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none"
                />
                <kbd className="hidden shrink-0 rounded-md bg-line px-1.5 py-0.5 font-sans text-[0.7rem] text-muted sm:block">
                  Esc
                </kbd>
              </div>

              <div
                id="command-palette-list"
                ref={listRef}
                role="listbox"
                className="max-h-80 overflow-y-auto p-2"
              >
                {filtered.length === 0 && (
                  <p className="px-3 py-6 text-center text-sm text-muted">No results.</p>
                )}

                {Object.entries(
                  filtered.reduce<Record<string, PaletteItem[]>>((acc, item) => {
                    (acc[item.group] ??= []).push(item);
                    return acc;
                  }, {})
                ).map(([group, groupItems]) => (
                  <div key={group} className="mb-1 last:mb-0">
                    <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted">
                      {group}
                    </p>
                    {groupItems.map((item) => {
                      runningIndex += 1;
                      const index = runningIndex;
                      const isActive = index === activeIndex;
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          id={`command-item-${item.id}`}
                          data-index={index}
                          role="option"
                          aria-selected={isActive}
                          onMouseEnter={() => setActiveIndex(index)}
                          onClick={() => select(item)}
                          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors duration-150 ${
                            isActive ? "bg-accent/10 text-accent" : "text-ink hover:bg-line"
                          }`}
                        >
                          <Icon className="h-4 w-4 shrink-0" />
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
