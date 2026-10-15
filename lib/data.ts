import type { ComponentType } from "react";
import { Mail } from "lucide-react";
import {
  SiN8N,
  SiAnthropic,
  SiLaravel,
  SiPhp,
  SiMysql,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiGooglechrome,
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
  { label: "n8n", icon: SiN8N },
  { label: "AI agents", icon: SiAnthropic },
  { label: "Laravel", icon: SiLaravel },
  { label: "PHP", icon: SiPhp },
  { label: "MySQL", icon: SiMysql },
  { label: "JavaScript", icon: SiJavascript },
  { label: "TypeScript", icon: SiTypescript },
  { label: "React", icon: SiReact },
  { label: "Next.js", icon: SiNextdotjs },
  { label: "Node.js", icon: SiNodedotjs },
  { label: "Chrome extensions", icon: SiGooglechrome },
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

export const projects: Project[] = [
  {
    slug: "fire-safety-erp",
    title: "Fire Safety Trading ERP",
    summary:
      "Production ERP running a multi-branch fire safety trading business end to end.",
    problem:
      "Three branches were running sales on spreadsheets and separate files — quotations, invoices, stock and payments each lived somewhere else, so no one could see the real position of a customer or a product without asking around.",
    built:
      "A single Laravel system covering quotations, invoicing, delivery challans, cash memos, inventory, customers, suppliers, expenses, payroll and tender records — 60+ controllers and 40+ models. Access is role- and branch-scoped, so each branch sees its own data while management sees all three. Branch-level and customer-specific pricing, price-change history, inventory movement history and print-ready document templates are built in.",
    role: "Solo developer — requirements, schema, backend and UI",
    stack: ["Laravel", "PHP", "MySQL", "Blade", "Tailwind CSS"],
    thumbnail: "/projects/fire-safety-erp.svg",
  },
  {
    slug: "auto-quote",
    title: "Auto Quote — AI quotation engine",
    summary:
      "Turns a raw customer inquiry — text, image, PDF, Excel — into a finished quotation.",
    problem:
      "Quotations were typed by hand from whatever the customer sent: a WhatsApp photo of a list, a PDF, an Excel sheet. Each one took real time, and typing product names and prices by hand is where mistakes happen.",
    built:
      "An engine that reads the inquiry in any of those formats, extracts the product lines, and matches them to the catalogue in layers: a cached lookup first, then local fuzzy matching, then an LLM pass for only the lines still unresolved. Built with cost and server load as constraints — the full pipeline result is cached against a hash of the inquiry, each inquiry triggers at most one AI call, prices, units and descriptions are fetched in bulk queries rather than per line, and the routes are throttled.",
    role: "Solo developer — design and implementation",
    stack: ["Laravel", "LLM API", "Document parsing", "Caching"],
    thumbnail: "/projects/auto-quote.svg",
  },
  {
    slug: "school-management",
    title: "School Management System",
    summary:
      "A 24-module school platform, from admissions through to fee collection and reports.",
    problem:
      "Schools run on a dozen disconnected registers — admissions, attendance, exams, fees, transport, library — and the same student data gets written again in each one.",
    built:
      "A React front end on an Express API covering students, teachers, admissions, attendance, exams, fees, finance, HR, payroll, timetable, transport, library, inventory, certificates, ID cards, notices, visitors and reports, plus a parent and student portal. Includes print-ready certificates and ID cards, and an end-to-end Playwright test suite over the main flows.",
    role: "Solo developer — API, front end and tests",
    stack: ["React", "Vite", "Express", "SQL", "Playwright"],
    thumbnail: "/projects/school-management.svg",
  },
  {
    slug: "attendance-salary",
    title: "Attendance & Salary System",
    summary:
      "Daily attendance capture that produces the month's salary sheets.",
    problem:
      "Attendance was kept on paper and salaries recalculated by hand each month, with advances and deductions tracked separately — slow, and easy to get wrong.",
    built:
      "A Laravel application for daily attendance across branches, rolled up into monthly summaries, with advances, bonuses and deductions applied to generate salary sheets ready to print.",
    role: "Solo developer",
    stack: ["Laravel", "PHP", "MySQL"],
    repoUrl: "https://github.com/zohaib298/FST-attendance-and-salary-system",
    thumbnail: "/projects/attendance-salary.svg",
  },
  {
    slug: "wa-toolkit",
    title: "WA Toolkit",
    summary:
      "A Chrome extension adding saved quick replies to WhatsApp Web.",
    problem:
      "Sales staff retype the same handful of replies all day, and the existing extensions for this either do far too much or break whenever WhatsApp Web ships a change.",
    built:
      "A Manifest V3 extension built on wa-js: saved quick replies with keyboard shortcuts and assisted sending, stored locally in IndexedDB. Written as a small, readable codebase rather than a patch into someone else's minified bundle, so it stays maintainable.",
    role: "Solo developer",
    stack: ["TypeScript", "React", "Chrome MV3", "Vite", "Dexie"],
    thumbnail: "/projects/wa-toolkit.svg",
  },
  {
    slug: "ai-digital-skills",
    title: "AI Digital Skills Platform",
    summary:
      "A learning platform with a separately deployed API and front end.",
    problem:
      "Course material and learner records needed a proper application rather than a folder of files — with real accounts, uploads and a schema behind them.",
    built:
      "An Express API handling authentication, request validation, file uploads and a defined SQL schema with seed scripts, paired with a React front end, each deployed as its own service.",
    role: "Solo developer — API and front end",
    stack: ["Express 5", "React", "Vite", "SQL", "REST"],
    thumbnail: "/projects/ai-digital-skills.svg",
  },
];
