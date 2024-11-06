/**
 * Default locale of the site, defined in the Astro config
 */
export const defaultLocale = 'en' as const;

/**
 * List of available locales, defined in the Astro config
 */
export const locales = ['en', 'pt'] as const;

/**
 * List of available locales, with the explicit format
 */
export const explicitLocales = {
  en: 'en-US',
  pt: 'pt-BR',
} as const;
