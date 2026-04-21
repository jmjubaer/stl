// app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/[folderId]",],
      },
    ],
    sitemap: "https://save-the-link.vercel.app/sitemap.xml",
  };
}