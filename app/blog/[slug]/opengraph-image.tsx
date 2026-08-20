import { ImageResponse } from "next/og";
import { getPost, getPostSlugs } from "@/lib/blog";

export const alt = "Blog post — Zohaib Mustafa";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0a0a12",
          backgroundImage:
            "radial-gradient(circle at 78% 45%, rgba(232,67,43,0.35) 0%, rgba(232,67,43,0) 60%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#E8432B",
            marginBottom: 24,
          }}
        >
          Blog
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.15,
            maxWidth: 980,
          }}
        >
          {post.title}
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#9CA3AF", marginTop: 32 }}>
          Zohaib Mustafa &nbsp;·&nbsp; {post.readingTime}
        </div>
      </div>
    ),
    { ...size }
  );
}
