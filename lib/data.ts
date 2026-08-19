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
    href: "https://github.com/zohaibmustafa298",
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
