import { Resvg } from '@resvg/resvg-js';
import type { CollectionEntry } from 'astro:content';
import { existsSync, mkdirSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import satori, { type SatoriOptions } from 'satori';
import getFonts from './fonts';
import getPostTemplate from './templates/post';

const fonts = await getFonts();

const SATORI_OPTIONS: SatoriOptions = {
  width: 1200,
  height: 630,
  fonts: [
    {
      name: 'Roboto',
      data: fonts.normal,
      weight: 300,
      style: 'normal',
    },
    {
      name: 'Roboto',
      data: fonts.bold,
      weight: 500,
      style: 'normal',
    },
  ],
};

function svgToPng(svg: string) {
  const resvg = new Resvg(svg);

  const pngData = resvg.render();
  return pngData.asPng();
}

export async function getPostImage(post: CollectionEntry<'blog'>) {
  const svg = await satori(await getPostTemplate(post), SATORI_OPTIONS);
  const png = svgToPng(svg);

  const dist = './dist/';
  const basePath = 'static/open-graph/';
  if (!existsSync(dist + basePath)) {
    mkdirSync(dist + basePath);
  }

  const imageUrl = `${basePath}${post.slug}.png`;
  await writeFile(dist + imageUrl, png);

  return imageUrl;
}
