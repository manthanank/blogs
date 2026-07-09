import type { CollectionEntry } from "astro:content";
import { postFilter } from "./postFilter";
import { slugifyStr } from "./slugify";

export type Tag = {
  tag: string;
  tagName: string;
  count: number;
};

/**
 * Builds a de-duplicated, sorted tag list from posts with counts.
 *
 * - Drafts and scheduled posts are excluded via `postFilter()`
 * - `tag` is the slug used in URLs; `tagName` is the original label for display
 * - Uniqueness is based on the slug (so differently-cased labels collapse)
 */
export function getUniqueTags(posts: CollectionEntry<"posts">[]) {
  const filteredPosts = posts.filter(postFilter);
  const tagCounts: Record<string, { tagName: string; count: number }> = {};

  filteredPosts.forEach(post => {
    post.data.tags.forEach(tag => {
      const slug = slugifyStr(tag);
      if (!tagCounts[slug]) {
        tagCounts[slug] = { tagName: tag, count: 0 };
      }
      tagCounts[slug].count += 1;
    });
  });

  const tags: Tag[] = Object.entries(tagCounts)
    .map(([slug, { tagName, count }]) => ({
      tag: slug,
      tagName,
      count,
    }))
    .sort((tagA, tagB) => tagA.tag.localeCompare(tagB.tag));

  return tags;
}
