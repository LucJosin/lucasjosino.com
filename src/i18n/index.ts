import { getRelativeLocaleUrl } from 'astro:i18n';
import { defaultLocale, locales } from './config';
import { enLocale } from './en';
import { ptLocale } from './pt';
import type { i18nSchema } from './schema';
import {
  type Locale,
  type LocaleSlug,
  type NestedKeys,
  type TranslationKeys,
} from './types';

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

  let locale = defaultLocale as Locale;
  let slug = path;

  if (parts.length > 0 && locales.includes(parts[0] as Locale)) {
    locale = parts[0] as Locale;
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
 * ```
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

interface NestedTranslations {
  [key: string]: string | NestedTranslations;
}

const translations: { [key: string]: string | NestedTranslations } = {
  ['' || defaultLocale]: enLocale,
  pt: ptLocale,
};

interface useLocaleReturn {
  locale: Locale;
  slug: string;
  t: (
    key: TranslationKeys,
    replacements?: Record<string, string | number>
  ) => string;
  localizePath: (path: string) => string;
  switchLocale: (locale: string) => string;
}

/**
 * Utility function to use i18n in Astro
 * @param pathname current page path
 * @returns object with locale, slug, t, localizePath and switchLocale
 * @example
 * ```astro
 * ---
 * import { useLocale } from 'lib/i18n';
 *
 * const { locale, t, localizePath, switchLocale } = useLocale(Astro.url.pathname);
 * ---
 *
 * <div>
 *  <h1>{t('home.title')}</h1>
 *  <p>Current locale: {locale}</p>
 *  <p>{t('home.greeting', { name: 'Alice' })}</p>
 *  <a href={localizePath('/about')}>{t('home.about')}</a>
 *  <a href={switchLocale('en')}>English</a>
 *  <a href={switchLocale('pt')}>Portuguese</a>
 * </div>
 * ```
 */
export function useLocale(pathname: string): useLocaleReturn {
  const { locale, slug } = extractLocaleAndSlug(pathname);
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
     * Translate a key to the current locale
     * @param key key reference to the translation
     * @param replacements object with values to replace in the translation
     * @returns translated string
     * @example
     * ```ts
     * console.log(t('home.title'))
     * // Output: 'Welcome to Astro'
     *
     * console.log(t('home.greeting', { name: 'Alice' }))
     * // Output: 'Hello, Alice!'
     *
     * console.log(t('home.unreadMessages', { count: 5 }))
     * // Output: 'You have 5 unread messages'
     * ```
     */
    t: (key: TranslationKeys, replacements?: Record<string, string | number>) =>
      t(locale, key, replacements),
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
  };
}

function t(
  locale: string,
  key: TranslationKeys,
  replacements?: Record<string, string | number>
): string {
  const keys = key.split('.') as Array<string>;
  const schema = translations[locale];
  let result: NestedTranslations | string | undefined = getNestedValue(
    schema,
    keys
  );

  if (!result) {
    throw new Error(`Missing translation for key: ${key}`);
  }

  // Handle pluralization if 'count' is provided
  if (
    replacements &&
    'count' in replacements &&
    typeof replacements.count === 'number'
  ) {
    const count = replacements.count;
    const baseKey = key as string;

    const oneKey = `${baseKey}_one` as NestedKeys<i18nSchema>;
    const otherKey = `${baseKey}_other` as NestedKeys<i18nSchema>;

    const one = getNestedValue(schema, oneKey.split('.'));
    const other = getNestedValue(schema, otherKey.split('.'));

    if (typeof one === 'string' && typeof other === 'string') {
      result = count === 1 ? one : other;
    } else {
      throw new Error(`Missing pluralization for key: ${key}, count: ${count}`);
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

  if (typeof result !== 'string') {
    throw new Error(`Translation result is not a string for key: ${key}`);
  }

  return result;
}

function getNestedValue(
  obj: NestedTranslations | string,
  keys: string[]
): NestedTranslations | string | undefined {
  let result: NestedTranslations | string = obj;
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      return undefined;
    }
  }
  return result;
}
