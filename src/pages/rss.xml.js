import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import { blog_categories, SITE_DESCRIPTION, SITE_TITLE } from "../consts";

export async function GET(context) {
  const categories = (
    await Promise.all(
      blog_categories.map(async (c) =>
        (await getCollection(c.collection))
          .filter((p) => !p.data.draft)
          .map((post) => ({
            ...post.data,
            link: `/read/${c.category}}/${post.id}/`,
          })),
      ),
    )
  )
    .filter((e) => e.length > 0)
    .flat();

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: [...categories].sort(
      (left, right) => left.pubDate.getTime() - right.pubDate.getTime(),
    ),
  });
}
