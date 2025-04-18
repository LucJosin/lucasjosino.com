import { reference, z } from 'astro:content';
import { locales } from 'i18n/config';

export const blogSchema = z.object({
  permSlug: z.string(),
  image: z.object({
    src: z.string().default('/static/default-og.png'),
    position: z.string().default('center'),
    showInPost: z.boolean().default(true),
  }),
  color: z.string().default('#111'),
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

export const noteSchema = z.object({
  title: z.string().max(65),
  description: z.string().max(160),
  tags: z.array(z.string()),
  language: z.enum(['en', 'pt']),
  isVisible: z.boolean().default(true),
  isIndexable: z.boolean().default(true),
  isDraft: z.boolean().default(false),
  enableComments: z.boolean().default(true),
});

export const projectSchema = z.object({
  permSlug: z.string(),
  thumbnail: z.string().optional(),
  images: z.array(z.string()).optional(),
  showImagesInSlider: z.boolean().default(true),
  title: z.string(),
  description: z.string(),
  git: z.string().optional(),
  url: z.string().optional(),
  article: z.string().optional(),
  tags: z.array(z.string()),
  codeLanguage: z.string(),
  language: z.enum(locales),
  icon: z.string(),
  category: z.enum(['Project', 'Org']),
  org: z.string().optional(),
  status: z.enum(['active', 'inactive', 'in_progress', 'completed', 'on_hold']),
  subProjects: z.array(reference('projects')).optional(),
  isVisible: z.boolean().default(true),
  isIndexable: z.boolean().default(true),
  color: z.string().default('#111'),
  target: z
    .array(
      z.enum([
        'Web',
        'Mobile',
        'Desktop',
        'CLI',
        'API',
        'SDK',
        'Library',
        'Plugin',
        'Other',
      ])
    )
    .optional(),
});

export const timelineSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
  location: z.string(),
  title: z.string(),
  institution: z.string(),
  description: z.string(),
  content: z.array(z.string()),
  technologies: z.array(z.string()),
  language: z.enum(locales),
});
