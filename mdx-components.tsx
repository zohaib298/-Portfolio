import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import Image, { type ImageProps } from "next/image";

// Global style mapping for all MDX blog content — keeps post typography
// aligned with the site's design tokens instead of Tailwind Typography defaults.
const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="mt-10 text-3xl font-bold tracking-tight text-ink first:mt-0 md:text-4xl">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-10 text-2xl font-bold tracking-tight text-ink">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 text-lg font-semibold tracking-tight text-ink">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mt-5 max-w-prose text-base leading-[1.7] text-muted">{children}</p>
  ),
  a: ({ href, children }) => {
    const isInternal = href?.startsWith("/") || href?.startsWith("#");
    if (isInternal && href) {
      return (
        <Link
          href={href}
          className="font-medium text-accent underline underline-offset-4 transition-colors duration-300 hover:text-ink"
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-accent underline underline-offset-4 transition-colors duration-300 hover:text-ink"
      >
        {children}
      </a>
    );
  },
  ul: ({ children }) => (
    <ul className="mt-5 max-w-prose list-disc space-y-2 pl-5 text-base leading-[1.7] text-muted">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-5 max-w-prose list-decimal space-y-2 pl-5 text-base leading-[1.7] text-muted">
      {children}
    </ol>
  ),
  blockquote: ({ children }) => (
    <blockquote className="mt-5 max-w-prose border-l-2 border-accent/50 pl-4 text-base italic leading-[1.7] text-muted">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-line" />,
  strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
  code: ({ children, className }) => {
    // Inline code always has plain string children. Fenced code (handled by
    // rehype-pretty-code) wraps its content in per-line <span data-line> elements —
    // neither it nor its <pre> parent carries a distinguishing className, so
    // children shape is the only reliable signal here.
    if (typeof children === "string") {
      return (
        <code className="rounded-md bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-accent ring-1 ring-line">
          {children}
        </code>
      );
    }
    return <code className={className}>{children}</code>;
  },
  pre: ({ children, ...props }) => (
    <pre
      {...props}
      className="mt-5 max-w-prose overflow-x-auto rounded-2xl bg-surface p-4 text-sm leading-relaxed ring-1 ring-line [&_code]:bg-transparent [&_code]:p-0 [&_code]:ring-0"
    >
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="mt-5 max-w-prose overflow-x-auto">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-line px-3 py-2 text-left font-semibold text-ink">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-line px-3 py-2 text-muted">{children}</td>
  ),
  img: ({ alt = "", ...props }) => (
    <Image
      sizes="100vw"
      style={{ width: "100%", height: "auto" }}
      className="mt-6 rounded-2xl ring-1 ring-line"
      alt={alt}
      {...(props as Omit<ImageProps, "alt">)}
    />
  ),
};

export function useMDXComponents(overrides: MDXComponents = {}): MDXComponents {
  return { ...components, ...overrides };
}
