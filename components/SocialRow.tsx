import { socialItems } from "@/lib/data";

export default function SocialRow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socialItems.map(({ label, href, icon: Icon, external }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-surface/70 text-muted backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:text-accent hover:shadow-[0_0_16px_rgba(232,67,43,0.35)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}
