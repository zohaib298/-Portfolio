"use client";

export default function Logo() {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <a
      href="#home"
      onClick={scrollToTop}
      className="font-display inline-block text-lg tracking-tight text-ink transition-all duration-300 hover:text-accent active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:rounded-sm"
    >
      <span className="font-bold">Zohaib</span>
      <span className="font-normal text-muted">mustafa.</span>
    </a>
  );
}
