"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { HOVER_SPRING } from "@/lib/motion";

export default function SkillCard({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={HOVER_SPRING}
      className="group flex flex-col items-center justify-center gap-3 rounded-2xl bg-surface/60 px-6 py-10 text-center ring-1 ring-white/5 transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(232,67,43,0.25)] hover:ring-accent/40"
    >
      {icon}
      <span className="text-sm text-white">{label}</span>
    </motion.div>
  );
}
