import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { getAllPosts, getPost, getPostSlugs } from "@/lib/blog";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const slugs = await getPostSlugs();
  if (!slugs.includes(slug)) return {};

  const post = await getPost(slug);
  return {
    title: post.title,
    description: post.summary,
    openGraph: { title: post.title, description: post.summary, type: "article", publishedTime: post.date },
    twitter: { card: "summary_large_image", title: post.title, description: post.summary },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const slugs = await getPostSlugs();
  if (!slugs.includes(slug)) {
    notFound();
  }

  const [post, { default: PostBody }] = await Promise.all([
    getPost(slug),
    import(`@/content/blog/${slug}.mdx`),
  ]);
  const allPosts = await getAllPosts();
  const index = allPosts.findIndex((p) => p.slug === slug);
  const prev = allPosts[index + 1];
  const next = allPosts[index - 1];

  return (
    <>
      <Header />

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-32 md:px-12 lg:px-20">
        <Reveal>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors duration-300 hover:text-accent focus-visible:outline-none focus-visible:text-accent"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            Back to blog
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-muted">
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

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink md:text-5xl">
            {post.title}
          </h1>

          {post.tags && post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-line px-3 py-1 text-xs text-muted">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <PostBody />
        </Reveal>

        {(prev || next) && (
          <Reveal delay={0.15} className="mt-16 flex flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:justify-between">
            {prev ? (
              <Link
                href={`/blog/${prev.slug}`}
                className="text-sm text-muted transition-colors duration-300 hover:text-accent"
              >
                ← {prev.title}
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={`/blog/${next.slug}`}
                className="text-sm text-muted transition-colors duration-300 hover:text-accent sm:text-right"
              >
                {next.title} →
              </Link>
            )}
          </Reveal>
        )}
      </main>

      <Footer />
    </>
  );
}
