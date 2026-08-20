"use client";

import { ViewTransition } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import type { Project } from "@/lib/data";
import { HOVER_SPRING } from "@/lib/motion";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={HOVER_SPRING}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-surface/60 ring-1 ring-line"
    >
      {/* Glow layer: pre-styled shadow, only its opacity animates on hover/focus-within. */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 shadow-glow-md ring-2 ring-accent/50 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100" />

      <Link
        href={`/projects/${project.slug}`}
        className="relative block focus-visible:outline-none"
      >
        <div className="relative aspect-4/3 overflow-hidden">
          <ViewTransition name={`project-thumb-${project.slug}`}>
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover transition-opacity duration-300 group-hover:opacity-80"
            />
          </ViewTransition>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface/90 shadow-glow-md backdrop-blur-sm">
              <ArrowUpRight className="h-5 w-5 text-accent" strokeWidth={2} />
            </span>
          </div>
        </div>

        <div className="p-6 pb-4">
          <h3 className="text-lg font-semibold tracking-tight text-ink">{project.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{project.summary}</p>
        </div>
      </Link>

      <div className="flex flex-1 flex-col justify-end gap-4 p-6 pt-0">
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span key={tech} className="rounded-full bg-line px-3 py-1 text-xs text-muted">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 text-sm">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-1.5 font-medium text-ink transition-colors duration-300 hover:text-accent focus-visible:outline-none focus-visible:text-accent"
            >
              Live <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-1.5 font-medium text-muted transition-colors duration-300 hover:text-accent focus-visible:outline-none focus-visible:text-accent"
            >
              <SiGithub className="h-3.5 w-3.5" /> Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
