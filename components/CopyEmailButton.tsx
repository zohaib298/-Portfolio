"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Mail } from "lucide-react";
import { DURATION, EASE } from "@/lib/motion";

/**
 * Email icon that copies the address to the clipboard (with a "Copied!"
 * confirmation) and also attempts a `mailto:` navigation. Clipboard-copy is
 * the reliable path — mailto: silently no-ops on any machine without a
 * default mail client configured, which turns out to be common.
 */
export default function CopyEmailButton({
  email,
  className,
}: {
  email: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — mailto below is the fallback.
    }
    window.location.href = `mailto:${email}`;
  };

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onClick={handleClick}
        aria-label={copied ? "Email address copied" : "Copy email address"}
        className={className}
      >
        {copied ? <Check className="h-4 w-4" strokeWidth={2} /> : <Mail className="h-4 w-4" />}
      </button>
      <AnimatePresence>
        {copied && (
          <motion.span
            role="status"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.fast, ease: EASE }}
            className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-surface px-2 py-1 text-xs text-ink shadow-lg ring-1 ring-line"
          >
            Copied!
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
