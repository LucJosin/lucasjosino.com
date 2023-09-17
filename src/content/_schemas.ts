import { z } from 'astro:content';

export const blogSchema = z.object({
  image: z.string().optional(),
  published_at: z.string(),
  updated_at: z.string(),
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  category: z.string().optional(),
  language: z.enum(['en', 'pt']),
  shortlink: z.string(),
  isDraft: z.boolean().default(false),
});
