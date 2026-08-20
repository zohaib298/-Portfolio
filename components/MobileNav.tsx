"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, X, Newspaper } from "lucide-react";
import { dockItems } from "@/lib/nav";
import { socialItems } from "@/lib/data";
import { DURATION, EASE, withReducedMotion } from "@/lib/motion";
import ThemeToggle from "@/components/ThemeToggle";
import CopyEmailButton from "@/components/CopyEmailButton";

const panelVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE } },
};

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = () => setOpen(false);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    close();
    // Let the drawer start closing before scrolling the page underneath it.
    requestAnimationFrame(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    });
  };

  // Focus trap + scroll lock while the drawer is open.
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])'
    );
    focusable?.[0]?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        triggerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors duration-300 hover:text-accent active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
      >
        <Menu className="h-6 w-6" strokeWidth={1.75} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: DURATION.fast }}
              className="fixed inset-0 z-60 bg-base/80 backdrop-blur-sm"
              onClick={close}
              aria-hidden="true"
            />
            <motion.div
              id="mobile-nav-panel"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={withReducedMotion(!!reduced, panelVariants)}
              className="fixed inset-x-4 top-20 z-70 rounded-2xl bg-surface/95 p-6 shadow-elevated ring-1 ring-line-strong backdrop-blur-md"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-sm uppercase tracking-[0.3em] text-muted">
                  Menu
                </span>
                <button
                  onClick={close}
                  aria-label="Close menu"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors duration-300 hover:text-accent active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                >
                  <X className="h-5 w-5" strokeWidth={1.75} />
                </button>
              </div>

              <nav className="mt-6 flex flex-col gap-1">
                {dockItems.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    onClick={(e) => handleNavClick(e, href)}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-base text-ink transition-colors duration-300 hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                    {label}
                  </a>
                ))}
                <Link
                  href="/blog"
                  onClick={close}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-base text-ink transition-colors duration-300 hover:bg-accent/10 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                >
                  <Newspaper className="h-5 w-5" strokeWidth={1.75} />
                  Blog
                </Link>
              </nav>

              <div className="mt-6 flex items-center justify-between border-t border-line pt-6">
                <div className="flex items-center gap-3">
                  {socialItems.map(({ label, href, icon: Icon, external }) =>
                    href.startsWith("mailto:") ? (
                      <CopyEmailButton
                        key={label}
                        email={href.replace(/^mailto:/, "")}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-base/60 text-muted transition-colors duration-300 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                      />
                    ) : (
                      <a
                        key={label}
                        href={href}
                        aria-label={label}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-base/60 text-muted transition-colors duration-300 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    )
                  )}
                </div>
                <ThemeToggle />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
