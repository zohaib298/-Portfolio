import type { MetadataRoute } from "next";

// TODO: replace with your real production domain once you have one.
const SITE_URL = "https://zohaibmustafa.dev";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
