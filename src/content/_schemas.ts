import { reference, z } from 'astro:content';

export const blogSchema = z.object({
  refFile: z.string().optional(),
  image: z.string().default('/static/banner.png'),
  publishedAt: z.string(),
  updatedAt: z.string(),
  title: z.string().max(65),
  description: z.string().max(160),
  tags: z.array(z.string()),
  category: z.string(),
  language: z.enum(['en', 'pt']),
  shortlink: z.string().default('/blog'),
  isVisible: z.boolean().default(true),
  enableComments: z.boolean().default(true),
  relatedPosts: z.array(reference('blog')).optional(),
});
