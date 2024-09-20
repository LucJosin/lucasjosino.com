import { getCollection } from 'astro:content';
import { defaultLocale } from 'i18n/config';

/*
 * Static paths options for the projects
 */
export interface StaticProjectPathsOptions {
  locale?: string;
}

/**
 * Get all projects
 * @param ignoreNonVisibleProjects ignore non-visible projects
 * @param locale locale of the projects to get
 * @returns all projects
 */
export async function getAllProjects(
  ignoreNonVisibleProjects: boolean = true,
  locale: string = ''
) {
  let projects = await getCollection('projects', (project) => {
    return locale ? project.data.language === locale : true;
  });

  if (ignoreNonVisibleProjects) {
    projects = projects.filter((project) => {
      return project.data.isVisible;
    });
  }

  return projects;
}

/**
 * Get all projects by slug
 * @param slug slug of the project to get
 * @returns all projects by slug
 * @example
 */
export async function getAllProjectsBySlug(slug: string) {
  return await getCollection('projects', (p) => {
    return p.data.permSlug === slug;
  });
}

/**
 * Get the static paths for the projects
 * @param options options for the function
 * @returns a proxy function to be used in getStaticPaths that returns the paths for the projects
 */
export function getStaticProjectPaths(options?: StaticProjectPathsOptions) {
  return async () => {
    const locale = options?.locale || defaultLocale;
    const projects = await getAllProjects(false, locale);
    return Promise.all(
      projects.map(async (project) => {
        const equals = await getAllProjectsBySlug(project.data.permSlug);

        const locales = equals.map((t) => ({
          locale: t.data.language,
          slug: t.data.permSlug,
        }));

        return {
          params: { slug: project.data.permSlug },
          props: { project, locales: locales },
        };
      })
    );
  };
}
