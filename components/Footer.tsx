import Logo from "@/components/Logo";
import SocialRow from "@/components/SocialRow";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-8 md:px-12 lg:px-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        <Logo />
        <p className="text-xs text-muted">
          &copy; {new Date().getFullYear()} Zohaib Mustafa. All rights reserved.
        </p>
        <SocialRow />
      </div>
    </footer>
  );
}
