import type { locales } from './config';
import type { i18nSchema } from './schema';

/**
 * Locales as a type
 */
export type Locale = (typeof locales)[number];

/**
 * Locale and slug extracted from a path
 */
export type LocaleSlug = {
  locale: string;
  slug: string;
};

/**
 * Get the nested keys of an object
 */
export type NestedKeys<T> = T extends object
  ? {
      [K in keyof T]: T[K] extends object
        ? `${string & K}` | `${string & K}.${NestedKeys<T[K]>}`
        : `${string & K}`;
    }[keyof T]
  : never;

/**
 * Translation keys of the i18n schema
 */
export type TranslationKeys = NestedKeys<i18nSchema>;
