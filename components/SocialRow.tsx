import { socialItems } from "@/lib/data";
import CopyEmailButton from "@/components/CopyEmailButton";

const buttonClasses =
  "flex h-9 w-9 items-center justify-center rounded-full bg-surface/70 text-muted backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:text-accent hover:shadow-glow-sm active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60";

export default function SocialRow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socialItems.map(({ label, href, icon: Icon, external }) =>
        href.startsWith("mailto:") ? (
          <CopyEmailButton key={label} email={href.replace(/^mailto:/, "")} className={buttonClasses} />
        ) : (
          <a
            key={label}
            href={href}
            aria-label={label}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={buttonClasses}
          >
            <Icon className="h-4 w-4" />
          </a>
        )
      )}
    </div>
  );
}
