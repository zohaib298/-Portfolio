"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { DURATION, EASE, fadeIn, scaleIn, withReducedMotion } from "@/lib/motion";

export default function Portrait() {
  const reduced = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const x = useTransform(springX, [-1, 1], [-14, 14]);
  const y = useTransform(springY, [-1, 1], [-10, 10]);

  useEffect(() => {
    if (reduced) return;
    const handleMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [reduced, mouseX, mouseY]);

  const photoVariants = withReducedMotion(!!reduced, scaleIn);
  const glowVariants = withReducedMotion(!!reduced, fadeIn);

  return (
    <motion.div style={reduced ? undefined : { x, y }} className="group relative">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={photoVariants}
        className="motion-fallback relative overflow-hidden rounded-3xl"
      >
        <Image
          src="/profile.jpeg"
          alt="Zohaib Mustafa"
          width={420}
          height={520}
          priority
          className="h-auto w-full object-cover"
        />
      </motion.div>
      {/* Accent ring/glow, faded in slightly after the photo settles — opacity only. */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={glowVariants}
        transition={{ delay: reduced ? 0 : DURATION.slow * 0.7, ease: EASE }}
        className="motion-fallback pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-accent/30 shadow-[0_0_40px_rgba(232,67,43,0.25)] transition-shadow duration-300 group-hover:shadow-[0_0_55px_rgba(232,67,43,0.4)] group-hover:ring-accent/60"
      />
    </motion.div>
  );
}
