import { getRelativeLocaleUrl } from 'astro:i18n';
import config from '../../astro.config.mjs';
import { enLocale } from './en';
import { ptLocale } from './pt';
import type { i18nSchema } from './schema';

interface NestedTranslations {
  [key: string]: string | NestedTranslations;
}

type NestedKeys<T> = T extends object
  ? {
      [K in keyof T]: T[K] extends object
        ? `${string & K}` | `${string & K}.${NestedKeys<T[K]>}`
        : `${string & K}`;
    }[keyof T]
  : never;

type TranslationKeys = NestedKeys<i18nSchema>;

type Pluralization = {
  singular: string;
  plural: string;
  count: number;
};

export type LocaleSlug = {
  locale: string;
  slug: string;
};

/**
 * Default locale of the site, defined in the Astro config
 */
export const defaultLocale = config.i18n!.defaultLocale;

/**
 * List of available locales, defined in the Astro config
 */
export const locales = config.i18n!.locales as string[];

const translationsA: { [key: string]: string | NestedTranslations } = {
  ['' || defaultLocale]: enLocale,
  pt: ptLocale,
};

const translations: { [key: string]: i18nSchema } = {
  ['' || defaultLocale]: enLocale,
  pt: ptLocale,
};

export function useLocale(pathname: string) {
  const { locale, slug } = extractLocaleAndSlug(pathname);
  const t = translations[locale];
  return {
    /**
     * Locale of the current page
     */
    locale,
    /**
     * Slug of the current page
     */
    slug,
    /**
     * Schema translation of the current locale
     * @example
     * ```ts
     * // t.about.title = 'About Me'
     * <h1>{t.about.title}</h1>
     * // Output: '<h1>About Me</h1>'
     * ```
     */
    t,
    ta: (
      key: TranslationKeys,
      replacements?: Record<string, string | number>
    ) => ta(locale, key, replacements),
    /**
     * Replace values in a translated string
     * @param t translared string key
     * @param options map containing the values to replace in the translated string
     * @returns translated string with replaced values
     * @example
     * ```ts
     * // projects.see_my_projects = 'See my projects <a href="{{link}}">here</a>'
     * interpolate('projects.see_my_projects', { link: '/projects' });
     * // Output: 'See my projects <a href="/projects">here</a>'
     * ```
     */
    interpolate: (t: string, options: Record<string, string>) =>
      interpolate(t, options),
    /**
     * Get the relative URL for the current locale
     * @param path path to be appended to the current locale
     * @returns relative URL for the current locale
     * @example
     * ```ts
     * // currentLocale = pt
     * console.log(localizePath('/about'))
     * // Output: '/pt/about'
     * ```
     */
    localizePath: (path: string) => getRelativeLocaleUrl(locale, path),
    /**
     * Get the relative URL for a specific locale
     * @param locale locale to be appended to the path
     * @returns relative URL for the specific locale
     * @example
     * ```ts
     * // current Path: '/about'
     * console.log(switchLocale('pt'))
     * // Output: '/pt/about'
     * ```
     */
    switchLocale: (locale: string) => getRelativeLocaleUrl(locale, slug),
    /**
     * Pluralize and interpolate a translated string
     * @param t translated string key
     * @param pl pluralization object containing the singular, plural and count values
     * @param it map containing the values to interpolate in the translated string
     * @returns translated string with replaced values
     * @example
     * ```ts
     * const text = "Explore all posts marked with '{{tag}}'" // Fallback
     * const singular = 'Explore {{count}} post marked with "{{tag}}"'
     * const plural = 'Explore {{count}} posts marked with "{{tag}}"'
     *
     * console.log(pluralize(text, { singular, plural, count: 0 }, { tag: 'Astro' }));
     * // Output: 'Explore all posts marked with "Astro"'
     *
     * console.log(pluralize(text, { singular, plural, count: 1 }, { tag: 'Astro' }));
     * // Output: 'Explore 1 post marked with "Astro"'
     *
     * console.log(pluralize(text, { singular, plural, count: 2 }, { tag: 'Astro' }));
     * // Output: 'Explore 2 posts marked with "Astro"'
     * ```
     */
    pluralize: (t: string, pl: Pluralization, it?: Record<string, string>) =>
      pluralize(t, pl, it),
  };
}

function ta(
  locale: string,
  key: TranslationKeys,
  replacements?: Record<string, string | number>
): string {
  const keys = key.split('.');
  let result: NestedTranslations | string = translationsA[locale];

  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k];
    } else {
      return `Missing translation for key: ${key}`;
    }
  }

  // If result is a string and replacements are provided, replace placeholders
  if (typeof result === 'string' && replacements) {
    let translated = result;
    for (const [replaceKey, replaceValue] of Object.entries(replacements)) {
      translated = translated.replace(
        `{{${replaceKey}}}`,
        String(replaceValue)
      );
    }
    return translated;
  }

  // Return the result directly if it’s not a string
  return typeof result === 'string'
    ? result
    : `Translation result is not a string for key: ${key}`;
}

function interpolate(t: string, opts: Record<string, string>): string {
  return t.replace(/{{\s*(\w+)\s*}}/g, (match, key) => {
    return key in opts ? opts[key] : match;
  });
}

function pluralize(
  t: string,
  pl: Pluralization,
  it?: Record<string, string>
): string {
  const { singular, plural, count } = pl;
  if (count === 0) {
    return interpolate(t, { count: count.toString(), ...it });
  }

  if (count === 1) {
    return interpolate(singular, { count: count.toString(), ...it });
  } else {
    return interpolate(plural, { count: count.toString(), ...it });
  }
}

/**
 * Get the locale and slug from a path
 * @param path path to extract locale and slug
 * @returns locale and slug extracted from the path
 * @example
 * ```ts
 * // path = '/pt/about'
 * console.log(extractLocaleAndSlug(path))
 * // Output: { locale: 'pt', slug: '/about' }
 * ```
 */
export function extractLocaleAndSlug(path: string): LocaleSlug {
  const parts = path.split('/').filter(Boolean);

  let locale = defaultLocale;
  let slug = path;

  if (parts.length > 0 && locales.includes(parts[0])) {
    locale = parts[0];
    slug = '/' + parts.slice(1).join('/');
  }

  return {
    locale,
    slug: normalizeUrl(slug) || '/',
  };
}

/**
 * Normalize a URL by adding a trailing slash at start and end
 * @param url URL to normalize
 * @returns normalized URL
 * @example
 * ```ts
 * // url = 'about'
 * console.log(normalizeUrl(url))
 * // Output: '/about/'
 */
export function normalizeUrl(url: string): string {
  url = url.trim();

  if (!url.startsWith('/')) {
    url = '/' + url;
  }

  if (!url.endsWith('/')) {
    url += '/';
  }

  return url;
}
