import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLocale } from 'i18n/config';

/**
 * Get all posts
 * @param sortByDate sort the posts by date
 * @param ignoreNonVisiblePosts ignore non-visible posts
 * @param locale locale of the posts to get
 * @returns all posts
 */
export async function getAllPosts(
  sortByDate: boolean = true,
  ignoreNonVisiblePosts: boolean = true,
  locale: string = ''
) {
  let posts = await getCollection('blog', (post) => {
    return !post.data.isDraft && locale ? post.data.language === locale : true;
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

/**
 * Get all posts by slug
 * @param slug slug of the post to get
 * @returns all posts by slug
 * @example
 */
export async function getAllPostsBySlug(slug: string) {
  return await getCollection('blog', (p) => {
    return !p.data.isDraft && p.data.permSlug === slug;
  });
}

/**
 * Get post length by tag or category
 * @param filter tag or category to get the post length for
 * @param target target to get the post length for (tags or category)
 * @returns post length by tag or category
 */
export async function getPostLength(
  locale: string,
  filter: string,
  target: string
) {
  const posts = await getAllPosts(true, true, locale);
  if (target === 'tags') {
    return posts.filter((post) => post.data.tags.includes(filter)).length;
  }
  return posts.filter((post) => post.data.category === filter).length;
}

/**
 * Get the unique tags from the posts
 * @param posts posts to get the tags from
 * @returns unique tags from the posts
 */
export async function getUniqueTags(posts: CollectionEntry<'blog'>[]) {
  return [...new Set(posts.map((post) => post.data.tags).flat())];
}

/**
 * Get the unique categories from the posts
 * @param posts posts to get the categories from
 * @returns unique categories from the posts
 */
export async function getUniqueCategories(posts: CollectionEntry<'blog'>[]) {
  return [...new Set(posts.map((post) => post.data.category).flat())];
}

/*
 * Static paths options for the blog posts
 */
export interface StaticBlogPathsOptions {
  locale?: string;
}

/**
 * Get the static paths for the blog posts
 * @param options options for the function
 * @returns a proxy function to be used in getStaticPaths that returns the paths for the blog posts
 */
export function getStaticBlogPaths(options?: StaticBlogPathsOptions) {
  return async () => {
    const locale = options?.locale || defaultLocale;
    const posts = await getAllPosts(true, false, locale);
    return Promise.all(
      posts.map(async (post) => {
        const equals = await getAllPostsBySlug(post.data.permSlug);

        const locales = equals.map((t) => ({
          locale: t.data.language,
          slug: t.data.permSlug,
        }));

        return {
          params: { slug: post.data.permSlug },
          props: { post, locales: locales },
        };
      })
    );
  };
}

/**
 * Get the static paths for the blog tags
 * @param options options for the function
 * @returns a proxy function to be used in getStaticPaths that returns the paths for the blog tags
 */
export function getStaticTagPaths(options?: StaticBlogPathsOptions) {
  return async () => {
    const locale = options?.locale || defaultLocale;
    const allPosts = await getAllPosts(true, true, locale);
    const tags = await getUniqueTags(allPosts);
    return Promise.all(
      tags.map((tag) => {
        const filteredPosts = allPosts.filter((post) =>
          post.data.tags.includes(tag)
        );
        return {
          params: { tag },
          props: { posts: filteredPosts },
        };
      })
    );
  };
}

/**
 * Get the static paths for the blog categories
 * @param options options for the function
 * @returns a proxy function to be used in getStaticPaths that returns the paths for the blog categories
 */
export function getStaticCategoryPaths(options?: StaticBlogPathsOptions) {
  return async () => {
    const locale = options?.locale || defaultLocale;
    const allPosts = await getAllPosts(true, true, locale);
    const categories = await getUniqueCategories(allPosts);
    return Promise.all(
      categories.map((category) => {
        const filteredPosts = allPosts.filter(
          (post) => post.data.category === category
        );
        return {
          params: { category },
          props: { posts: filteredPosts },
        };
      })
    );
  };
}
