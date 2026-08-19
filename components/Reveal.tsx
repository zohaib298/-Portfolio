"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { VIEWPORT, fadeUp, staggerContainer, withReducedMotion } from "@/lib/motion";

/** Fades + rises a single block into view once, on scroll. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const variants = withReducedMotion(!!reduced, fadeUp);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={variants}
      transition={delay ? { delay } : undefined}
      className={`motion-fallback ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}

/**
 * Wraps a group of `StaggerItem`s (e.g. a card grid) and staggers their
 * entrance as the group scrolls into view. Children inherit the "visible"
 * state automatically via variant propagation — they don't need their own
 * whileInView.
 */
export function StaggerGroup({
  children,
  className,
  stagger,
  delayChildren,
  trigger = "viewport",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  /** "viewport" (default) reveals on scroll; "mount" plays once, immediately on load — for above-the-fold content like the Hero. */
  trigger?: "viewport" | "mount";
}) {
  const reduced = useReducedMotion();
  const container = withReducedMotion(
    !!reduced,
    staggerContainer(stagger, delayChildren),
    staggerContainer(0, 0)
  );

  const triggerProps =
    trigger === "mount"
      ? { animate: "visible" }
      : { whileInView: "visible", viewport: VIEWPORT };

  return (
    <motion.div initial="hidden" variants={container} className={className} {...triggerProps}>
      {children}
    </motion.div>
  );
}

/** A single fade-up item inside a `StaggerGroup`. */
export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const variants = withReducedMotion(!!reduced, fadeUp);

  return (
    <motion.div variants={variants} className={`motion-fallback ${className ?? ""}`}>
      {children}
    </motion.div>
  );
}
