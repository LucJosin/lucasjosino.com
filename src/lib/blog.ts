import { getCollection } from 'astro:content';

export async function getAllPosts(
  sortByDate: boolean = true,
  ignoreNonVisiblePosts: boolean = true
) {
  let posts = await getCollection('blog', (post) => {
    return !post.data.isDraft;
  });

  if (ignoreNonVisiblePosts) {
    posts = posts.filter((post) => {
      return post.data.isVisible;
    });
  }

  if (sortByDate) {
    posts
      .sort(
        (a, b) =>
          Date.parse(a.data.publishedAt) - Date.parse(b.data.publishedAt)
      )
      .reverse();
  }

  return posts;
}

export async function getPostLength(tag: string, target: string) {
  const posts = await getAllPosts();
  if (target === 'tags') {
    return posts.filter((post) => post.data.tags.includes(tag)).length;
  }
  return posts.filter((post) => post.data.category === tag).length;
}

export async function getUniqueTags() {
  const posts = await getAllPosts();
  return [...new Set(posts.map((post) => post.data.tags).flat())];
}
export async function getUniqueCategories() {
  const posts = await getAllPosts();
  return [...new Set(posts.map((post) => post.data.category).flat())];
}
