import type { MetadataRoute } from "next";
import { fetchQuery } from "convex/nextjs";

import { api } from "@/convex/_generated/api";

export const runtime = "nodejs";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const notes = await fetchQuery(api.documents.getPublishedSlugs);

  const noteEntries: MetadataRoute.Sitemap = notes.map((note) => ({
    url: `${SITE_URL}/notes/${note.slug}`,
    lastModified: new Date(note.updatedAt ?? note.creationTime),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...noteEntries,
  ];
}
