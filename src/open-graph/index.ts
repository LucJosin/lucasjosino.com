import { createSatoriOgInstance, type SatoriOptions } from 'satori-og';
import blogRender from './renders/blog';
import defaultRender from './renders/default';
import projectRender from './renders/project';

const SATORI_OPTIONS: SatoriOptions = {
  width: 1200,
  height: 630,
  fonts: [
    {
      name: 'Roboto',
      url: 'https://www.1001fonts.com/download/font/roboto.regular.ttf',
      weight: 300,
      style: 'normal',
    },
    {
      name: 'Roboto',
      url: 'https://www.1001fonts.com/download/font/roboto.bold.ttf',
      weight: 500,
      style: 'normal',
    },
  ],
};

const renders = {
  default: defaultRender,
  blog: blogRender,
  project: projectRender,
} as const;

type Render = keyof typeof renders;

/**
 * Generate an image using the satori-og library
 *
 * If the image already exists, it will return the path to the image
 */
export async function getOpenGraphImage(
  render: Render,
  data: Record<string, string>,
  name?: string
): Promise<string> {
  const instance = createSatoriOgInstance({
    satori: SATORI_OPTIONS,
    dist: import.meta.env.DEV
      ? './.astro/open-graph'
      : './dist/static/open-graph',
    overwriteImages: false,
    cacheImagePath: true,
    renders: renders,
  });

  // Vite: Files in the 'public' directory are served at the root path.
  const path = await instance.generateImage(render, data, name);
  return path.replace(import.meta.env.DEV ? '.' : './dist', '');
}

export function cleanOpenGraphUrl(url: string): string {
  if (url.startsWith('/')) {
    url = url.slice(1);
  }

  if (url.endsWith('/')) {
    url = url.slice(0, -1);
  }

  return url;
}

export function formatOpenGraphFileName(path: string): string {
  const fileName = path === '/' ? 'index' : path === '/pt/' ? 'pt-index' : path;
  return cleanOpenGraphUrl(fileName).replaceAll('/', '-');
}
