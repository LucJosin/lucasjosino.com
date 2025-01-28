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
      'Explore my developer blog with projects, ideas, tutorials and other stuff.',
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
        link: createUrl(domain, post.language, item.data.permSlug),
        pubDate: new Date(post.publishedAt),
        commentsUrl: createUrl(
          domain,
          post.language,
          item.data.permSlug,
          'comments'
        ),
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

function createUrl(
  domain: string,
  locale: string,
  slug: string,
  anchor?: string
) {
  return locale === 'en'
    ? `${domain}/blog/${slug}/${anchor ? `#${anchor}` : ''}`
    : `${domain}/${locale}/blog/${slug}/${anchor ? `#${anchor}` : ''}`;
}
