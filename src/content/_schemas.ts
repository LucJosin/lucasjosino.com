import { reference, z } from 'astro:content';

export const blogSchema = z.object({
  refFile: z.string().optional(),
  image: z.object({
    src: z.string().default('/static/default-og.png'),
    position: z.string().default('center'),
    showInPost: z.boolean().default(true),
  }),
  color: z.string().default("#111"),
  publishedAt: z.string(),
  updatedAt: z.string().optional(),
  title: z.string().max(65),
  description: z.string().max(160),
  tags: z.array(z.string()),
  category: z.string(),
  language: z.enum(['en', 'pt']),
  shortlink: z.string().default('/blog'),
  isVisible: z.boolean().default(true),
  isIndexable: z.boolean().default(true),
  isDraft: z.boolean().default(false),
  enableComments: z.boolean().default(true),
  relatedPosts: z.array(reference('blog')).max(4).optional(),
  easyShare: z.boolean().default(true),
});
