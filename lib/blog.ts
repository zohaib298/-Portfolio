import fs from "node:fs/promises";
import path from "node:path";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");
const WORDS_PER_MINUTE = 200;

export type PostMetadata = {
  title: string;
  date: string;
  summary: string;
  tags?: string[];
};

export type Post = PostMetadata & {
  slug: string;
  readingTime: string;
};

export async function getPostSlugs(): Promise<string[]> {
  const files = await fs.readdir(POSTS_DIR);
  return files.filter((file) => file.endsWith(".mdx")).map((file) => file.replace(/\.mdx$/, ""));
}

async function getReadingTime(slug: string): Promise<string> {
  const raw = await fs.readFile(path.join(POSTS_DIR, `${slug}.mdx`), "utf8");
  const words = raw.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}

export async function getPost(slug: string): Promise<Post> {
  const { metadata } = (await import(`@/content/blog/${slug}.mdx`)) as {
    metadata: PostMetadata;
  };
  const readingTime = await getReadingTime(slug);
  return { ...metadata, slug, readingTime };
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(slugs.map(getPost));
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}
