import rss from '@astrojs/rss';
import headConfig from '@constants/head';
import { getAllPosts } from '@lib/blog';

export async function GET() {
  const posts = await getAllPosts();
  const domain = headConfig.canonical;
  return rss({
    trailingSlash: true,
    title: 'Lucas Josino',
    description:
      'Explore my developer blog with thoughts, ideas and other stuff.',
    site: domain,
    xmlns: {
      webfeeds: 'http://webfeeds.org/rss/1.0',
      media: 'http://search.yahoo.com/mrss/',
    },
    items: posts.map((item) => {
      const post = item.data;
      return {
        title: post.title,
        description: post.description,
        link: `${domain}/blog/${item.slug}`,
        pubDate: new Date(post.publishedAt),
        commentsUrl: `${domain}/blog/${item.slug}/#comments`,
        author: `Lucas Josino (contact@lucasjosino.com)`,
        categories: [post.category],
        enclosure: {
          url: `${post.image.src}`,
          type: `image/${post.image.src.split('.').pop()}`,
          length: 23600,
        },
        customData:
          `<language>${post.language}</language>` +
          `<media:content
            url="${post.image.src}"
            medium="image"
            type="image/${post.image.src.split('.').pop()}"
            width="1200"
            height="630" />`,
      };
    }),
    customData:
      `<author><name>Lucas Josino</name><email>contact@lucasjosino.com</email></author>` +
      `<copyright>${headConfig.copyright}</copyright>` +
      `<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
  });
}
