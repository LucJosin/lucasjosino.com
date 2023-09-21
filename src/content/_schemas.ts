import { reference, z } from 'astro:content';

export const blogSchema = z.object({
  image: z.string().optional(),
  published_at: z.string(),
  updated_at: z.string(),
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  category: z.string(),
  language: z.enum(['en', 'pt']),
  shortlink: z.string(),
  isVisible: z.boolean().default(true),
  enableComments: z.boolean().default(true),
  relatedPosts: z.array(reference('blog')).optional(),
});
