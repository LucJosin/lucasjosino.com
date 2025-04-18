import { getCollection } from 'astro:content';
import { defaultLocale } from 'i18n/config';

/**
 * Get all notes
 * @param ignoreNonVisiblenotes ignore non-visible notes
 * @param locale locale of the notes to get
 * @returns all notes
 */
export async function getAllNotes(
  ignoreNonVisiblenotes: boolean = true,
  locale: string = ''
) {
  let notes = await getCollection('notes', (note) => {
    return !note.data.isDraft && locale ? note.data.language === locale : true;
  });

  if (ignoreNonVisiblenotes) {
    notes = notes.filter((note) => {
      return note.data.isVisible;
    });
  }

  return notes;
}

/**
 * Get all notes by slug
 * @param slug slug of the project to get
 * @returns all notes by slug
 * @example
 */
export async function getAllNotesBySlug(slug: string) {
  return await getCollection('notes', (p) => {
    return p.slug === slug;
  });
}

/*
 * Static paths options for the blog notes
 */
export interface StaticNotePathsOptions {
  locale?: string;
}

/**
 * Get the static paths for the notes
 * @param options options for the function
 * @returns a proxy function to be used in getStaticPaths that returns the paths for the notes
 */
export function getStaticNotePaths(options?: StaticNotePathsOptions) {
  return async () => {
    const locale = options?.locale || defaultLocale;
    const notes = await getAllNotes(false, locale);
    return Promise.all(
      notes.map(async (note) => {
        const equals = await getAllNotesBySlug(note.slug);

        const locales = equals.map((t) => ({
          locale: t.data.language,
          slug: t.slug,
        }));

        return {
          params: { slug: note.slug },
          props: { note, locales: locales },
        };
      })
    );
  };
}
