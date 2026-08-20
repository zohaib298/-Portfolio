import type { ComponentType } from "react";
import { Mail } from "lucide-react";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiLaravel,
  SiNodedotjs,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiInstagram,
} from "react-icons/si";

type Icon = ComponentType<{ className?: string }>;

export type Skill = {
  label: string;
  icon: Icon;
};

export const skills: Skill[] = [
  { label: "HTML", icon: SiHtml5 },
  { label: "CSS", icon: SiCss },
  { label: "JavaScript", icon: SiJavascript },
  { label: "React", icon: SiReact },
  { label: "Next.js", icon: SiNextdotjs },
  { label: "Laravel", icon: SiLaravel },
  { label: "Node.js", icon: SiNodedotjs },
  { label: "Tailwind CSS", icon: SiTailwindcss },
  { label: "Git", icon: SiGit },
];

export type SocialItem = {
  label: string;
  href: string;
  icon: Icon;
  external: boolean;
};

export const socialItems: SocialItem[] = [
  {
    label: "Email",
    href: "mailto:zohaibmustafa200@gmail.com",
    icon: Mail,
    external: false,
  },
  {
    label: "GitHub",
    href: "https://github.com/zohaib298",
    icon: SiGithub,
    external: true,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/zohaibmustafa53",
    icon: SiInstagram,
    external: true,
  },
];

export type Project = {
  /** URL-safe identifier — used for the /projects/[slug] route. */
  slug: string;
  title: string;
  /** One-line summary shown on the card. */
  summary: string;
  /** What problem this project solves. */
  problem: string;
  /** What you actually built. */
  built: string;
  /** Your role on the project (e.g. "Solo full-stack developer"). */
  role: string;
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
  /** Path under /public, e.g. "/projects/my-project.jpg". */
  thumbnail: string;
};

// TODO: Add your real projects here as they're finished. Example shape:
// {
//   slug: "example-project",
//   title: "Example Project",
//   summary: "One-line summary of what this project does.",
//   problem: "TODO: what problem did this solve?",
//   built: "TODO: what did you build, concretely?",
//   role: "TODO: your role, e.g. Solo full-stack developer",
//   stack: ["Next.js", "TypeScript", "Tailwind CSS"],
//   liveUrl: "https://example.com",
//   repoUrl: "https://github.com/zohaibmustafa298/example",
//   thumbnail: "/projects/example-project.jpg",
// },
export const projects: Project[] = [];
