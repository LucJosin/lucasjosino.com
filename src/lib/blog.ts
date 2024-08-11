import { getCollection } from 'astro:content';
import { defaultLocale, locales } from 'i18n';

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

export async function getAllTranslations(slug: string, locale: string) {
  return await getCollection('blog', (p) => {
    return (
      !p.data.isDraft && p.data.permSlug === slug && p.data.language !== locale
    );
  });
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
  meta: string;
}

/**
 * Get the static paths for the blog posts
 * @param options options for the function
 * @returns a proxy function to be used in getStaticPaths that returns the paths for the blog posts
 */
export function getStaticBlogPaths(options: StaticBlogPathsOptions) {
  return async () => {
    const locale = extractLocaleFromUrl(options.meta);
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
