import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/Reveal";
import { STAGGER } from "@/lib/motion";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on building things — projects, code, and what I'm learning along the way.",
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <>
      <Header />

      <main className="mx-auto max-w-4xl px-6 pb-24 pt-32 md:px-12 lg:px-20">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-muted">Blog</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink md:text-5xl">
            Notes &amp; write-ups
          </h1>
          <p className="mt-4 max-w-prose text-base leading-relaxed text-muted">
            Build logs, project retrospectives, and things I&apos;m learning along the way.
          </p>
        </Reveal>

        {posts.length === 0 ? (
          <p className="mt-16 text-sm text-muted">No posts yet — check back soon.</p>
        ) : (
          <StaggerGroup stagger={STAGGER} className="mt-16 flex flex-col gap-4">
            {posts.map((post) => (
              <StaggerItem key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block rounded-2xl bg-surface/60 p-6 ring-1 ring-line transition-shadow duration-300 hover:shadow-glow-sm hover:ring-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                >
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <span aria-hidden="true">&middot;</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h2 className="mt-2 text-xl font-semibold tracking-tight text-ink transition-colors duration-300 group-hover:text-accent">
                    {post.title}
                  </h2>
                  <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted">
                    {post.summary}
                  </p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-line px-3 py-1 text-xs text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </main>

      <Footer />
    </>
  );
}
