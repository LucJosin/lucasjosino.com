import { getCollection, type CollectionEntry } from 'astro:content';
import { defaultLocale, locales } from 'i18n';

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
 * Get all translations for a post
 * @param slug slug of the post to get the translations for
 * @param locale locale of the post to IGNORE in the translations filter
 * @returns all translations for the post
 */
export async function getAllTranslations(slug: string, locale: string) {
  return await getCollection('blog', (p) => {
    return (
      !p.data.isDraft && p.data.permSlug === slug && p.data.language !== locale
    );
  });
}

/**
 * Get post length by tag or category
 * @param filter tag or category to get the post length for
 * @param target target to get the post length for (tags or category)
 * @returns post length by tag or category
 */
export async function getPostLength(filter: string, target: string) {
  const posts = await getAllPosts();
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

/**
 * Extract the locale from a path
 * @param metaUrl path to extract locale from
 * @returns locale extracted from the path or default locale
 */
function extractLocaleFromUrl(metaUrl: string): string {
  const segments = metaUrl.split('/');

  // Get the segment right after 'pages'
  const possibleLocale = segments[segments.indexOf('pages') + 1];

  // Return the locale if it's a valid locale, otherwise return the default locale
  return locales.includes(possibleLocale) ? possibleLocale : defaultLocale;
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
export function getStaticBlogPaths(options: StaticBlogPathsOptions) {
  return async () => {
    const locale = options.locale || defaultLocale;
    const posts = await getAllPosts(true, false, locale);
    return Promise.all(
      posts.map(async (post) => {
        const translations = await getAllTranslations(
          post.data.permSlug,
          locale
        );

        const locales = translations.map((t) => t.data.language);

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
export function getStaticTagPaths(options: StaticBlogPathsOptions) {
  return async () => {
    const locale = options.locale || defaultLocale;
    const allPosts = await getAllPosts(true, false, locale);
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
export function getStaticCategoryPaths(options: StaticBlogPathsOptions) {
  return async () => {
    const locale = options.locale || defaultLocale;
    const allPosts = await getAllPosts(true, false, locale);
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
