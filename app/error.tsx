"use client";

import { useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO: send this to a real error-tracking service (e.g. Sentry).
    console.error(error);
  }, [error]);

  return (
    <>
      <Header />

      <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 py-32 text-center md:px-12 lg:px-20">
        <p className="font-mono text-sm text-accent">Error</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink md:text-4xl">
          Something went wrong
        </h1>
        <p className="mt-4 max-w-prose text-base leading-relaxed text-muted">
          An unexpected error occurred. Try again, or head back home.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full bg-accent-strong px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:scale-105 hover:shadow-glow-lg active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-base"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm font-medium text-ink transition-colors duration-300 hover:border-accent hover:text-accent active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70"
          >
            Back to home
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
