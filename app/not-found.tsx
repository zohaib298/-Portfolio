import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />

      <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 py-32 text-center md:px-12 lg:px-20">
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink md:text-4xl">
          Page not found
        </h1>
        <p className="mt-4 max-w-prose text-base leading-relaxed text-muted">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent-strong px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:scale-105 hover:shadow-glow-lg active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-base"
        >
          Back to home
        </Link>
      </main>

      <Footer />
    </>
  );
}
