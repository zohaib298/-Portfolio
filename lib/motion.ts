import type { Transition, Variants } from "motion/react";

/**
 * Single source of truth for animation timing across the site.
 * Every animated component should pull from here instead of
 * hardcoding its own durations/easing.
 */

// Smooth, premium deceleration curve — no bounce/overshoot.
export const EASE: Transition["ease"] = [0.16, 1, 0.3, 1];

export const DURATION = {
  fast: 0.2,
  base: 0.35,
  slow: 0.5,
};

// Stagger interval used for scroll-reveal groups and the hero sequence.
export const STAGGER = 0.07;

// Shared viewport config for scroll reveals.
export const VIEWPORT = { once: true, margin: "-100px" } as const;

// Spring used for hover lifts on interactive cards.
export const HOVER_SPRING: Transition = { type: "spring", stiffness: 300, damping: 24 };

// Reduced-motion fallback: opacity only, near-instant, never invisible.
const REDUCED_FADE: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.fast, ease: EASE } },
};

/** Pick the full variant set, or an opacity-only fallback when the user prefers reduced motion. */
export function withReducedMotion(
  reduced: boolean,
  full: Variants,
  fallback: Variants = REDUCED_FADE
): Variants {
  return reduced ? fallback : full;
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION.slow, ease: EASE } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.base, ease: EASE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: DURATION.slow, ease: EASE } },
};

export function staggerContainer(stagger: number = STAGGER, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}
