"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { HOVER_SPRING } from "@/lib/motion";

export default function SkillCard({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={HOVER_SPRING}
      className="group flex flex-col items-center justify-center gap-3 rounded-2xl bg-surface/60 px-6 py-10 text-center ring-1 ring-line transition-shadow duration-300 hover:shadow-glow-md hover:ring-accent/40"
    >
      {icon}
      <span className="text-sm text-ink">{label}</span>
    </motion.div>
  );
}
