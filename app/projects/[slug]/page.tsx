import type { Metadata } from "next";
import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/lib/data";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [project.thumbnail],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.summary,
      images: [project.thumbnail],
    },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Header />

      <main className="mx-auto max-w-4xl px-6 pb-24 pt-32 md:px-12 lg:px-20">
        <Reveal>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-accent focus-visible:outline-none focus-visible:text-accent"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            Back to projects
          </Link>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-ink md:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            {project.summary}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent-strong px-5 py-2.5 font-semibold text-white transition-transform duration-200 hover:scale-105 hover:shadow-glow-lg active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-base"
              >
                Live Site <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 font-medium text-ink transition-colors duration-300 hover:border-accent hover:text-accent active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
              >
                <SiGithub className="h-4 w-4" /> View Code
              </a>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="relative mt-10 aspect-video overflow-hidden rounded-2xl ring-1 ring-line">
          <ViewTransition name={`project-thumb-${project.slug}`}>
            <Image src={project.thumbnail} alt={project.title} fill className="object-cover" priority />
          </ViewTransition>
        </Reveal>

        <Reveal delay={0.15} className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="md:col-span-2 flex flex-col gap-8">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-accent">
                The Problem
              </h2>
              <p className="mt-3 max-w-prose text-base leading-relaxed text-muted">
                {project.problem}
              </p>
            </div>
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-accent">
                What I Built
              </h2>
              <p className="mt-3 max-w-prose text-base leading-relaxed text-muted">
                {project.built}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-accent">
                My Role
              </h2>
              <p className="mt-3 text-base leading-relaxed text-muted">{project.role}</p>
            </div>
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-accent">
                Tech Stack
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-surface/60 px-3 py-1 text-xs text-muted ring-1 ring-line"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </main>

      <Footer />
    </>
  );
}
