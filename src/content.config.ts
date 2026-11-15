import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { boolean, z } from "astro/zod";
import { blog_categories } from "./consts";

const base_schema = {
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  draft: z.optional(boolean()),
};

const blog_posts = Object.fromEntries(
  blog_categories.map((c) => [
    c.collection,
    defineCollection({
      loader: glob({
        base: ["./src/blog/", c.category].join("/"),
        pattern: "**/*/index.{md,mdx,astro}",
        generateId: ({ entry }) => entry.split("/").slice(0, -1).join("/"),
      }),
      // Type-check frontmatter using a schema
      schema: ({ image }) =>
        z.object({
          ...base_schema,
          heroImage: z.optional(image()),
          tags: z.array(z.string()).default([]),
        }),
    }),
  ]),
);

export const collections = { ...blog_posts };
