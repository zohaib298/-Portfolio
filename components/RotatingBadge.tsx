"use client";

import { ArrowDownRight } from "lucide-react";

export default function RotatingBadge() {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      aria-label="View my projects"
      className="group relative flex h-28 w-28 shrink-0 items-center justify-center transition-transform duration-200 active:scale-[0.97] focus-visible:outline-none"
    >
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-spin-slow">
        <defs>
          <path id="badge-circle" d="M100,100 m-84,0 a84,84 0 1,1 168,0 a84,84 0 1,1 -168,0" />
        </defs>
        <text fontSize="13" letterSpacing="3" fill="#9CA3AF">
          <textPath href="#badge-circle">MY PROJECTS &#8226; MY PROJECTS &#8226; </textPath>
        </text>
      </svg>
      <span className="absolute inset-3 rounded-full bg-surface/80 shadow-[0_0_30px_rgba(232,67,43,0.25)] backdrop-blur-sm transition-shadow duration-300 group-hover:shadow-[0_0_45px_rgba(232,67,43,0.5)] group-focus-visible:shadow-[0_0_45px_rgba(232,67,43,0.5)] group-focus-visible:ring-2 group-focus-visible:ring-accent/70" />
      <ArrowDownRight className="relative h-6 w-6 text-accent" strokeWidth={2} />
    </button>
  );
}
