import { getCollection } from 'astro:content';

export async function getAllPosts(sortByDate: boolean = true) {
  const posts = await getCollection('blog', (post) => {
    return !post.data.isDraft && post.data.isVisible;
  });

  if (sortByDate) {
    posts.sort(
      (a, b) => Date.parse(a.data.publishedAt) - Date.parse(b.data.publishedAt)
    );
  }

  return posts;
}

export async function getPostLength(tag: string) {
  const posts = await getAllPosts();
  return posts.filter((post) => post.data.tags.includes(tag)).length;
}

export async function getUniqueTags() {
  const posts = await getAllPosts();
  return [...new Set(posts.map((post) => post.data.tags).flat())];
}
