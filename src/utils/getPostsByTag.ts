import type { CollectionEntry } from "astro:content";
import getSortedPosts from "./getSortedPosts";
import { slugifyAll } from "./slugify";

const getPostsByTag = async (posts: CollectionEntry<"blog">[], tag: string) => {
  const sortedPosts = await getSortedPosts(posts);
  return sortedPosts.filter(post => slugifyAll(post.data.tags).includes(tag));
};

export default getPostsByTag;
