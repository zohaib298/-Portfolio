"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import { HOVER_SPRING } from "@/lib/motion";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.a
      href={project.href}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      transition={HOVER_SPRING}
      className="group block overflow-hidden rounded-2xl bg-surface/60 ring-1 ring-white/5 transition-shadow duration-300 hover:shadow-[0_0_36px_rgba(232,67,43,0.3)] hover:ring-accent/50 focus-visible:outline-none focus-visible:shadow-[0_0_36px_rgba(232,67,43,0.3)] focus-visible:ring-2 focus-visible:ring-accent/50"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src="/project-placeholder.svg"
          alt={project.title}
          fill
          className="object-cover transition-opacity duration-300 group-hover:opacity-50 group-focus-visible:opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface/90 shadow-[0_0_30px_rgba(232,67,43,0.35)] backdrop-blur-sm">
            <ArrowUpRight className="h-6 w-6 text-accent" strokeWidth={2} />
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-white">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-xs text-muted">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}
