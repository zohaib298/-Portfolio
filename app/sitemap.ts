import type { MetadataRoute } from "next";
import { projects } from "@/lib/data";
import { getAllPosts } from "@/lib/blog";

// TODO: replace with your real production domain once you have one.
const SITE_URL = "https://zohaibmustafa.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: new Date(),
  }));

  const posts = await getAllPosts();
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
    },
    ...projectEntries,
    ...postEntries,
  ];
}
