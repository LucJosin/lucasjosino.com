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
