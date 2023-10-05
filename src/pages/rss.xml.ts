import rss from '@astrojs/rss';
import headConfig from '@constants/head';
import { getAllPosts } from '@lib/blog';

export async function GET() {
  const posts = await getAllPosts();

  return rss({
    title: 'Lucas Josino',
    description:
      'A minimalist developer blog with thoughts, ideas and other stuff',
    site: headConfig.canonical,
    items: posts.map(({ data: { publishedAt, title, description }, slug }) => ({
      title,
      description,
      link: `${headConfig.canonical}/blog/${slug}`,
      pubDate: new Date(publishedAt),
    })),
  });
}
