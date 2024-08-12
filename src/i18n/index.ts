import { getRelativeLocaleUrl } from 'astro:i18n';
import config from '../../astro.config.mjs';
import { enLocale } from './en';
import { ptLocale } from './pt';
import type { i18nSchema } from './schema';

type LocaleSlug = {
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
    interpolate: (t: string, options: Record<string, string>) => r(t, options),
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

function r(template: string, replacements: Record<string, string>): string {
  return template.replace(/{{\s*(\w+)\s*}}/g, (match, key) => {
    return key in replacements ? replacements[key] : match;
  });
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
    slug: slug || '/',
  };
}
