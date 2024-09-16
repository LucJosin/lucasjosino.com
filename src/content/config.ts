import { defineCollection } from 'astro:content';
import { blogSchema, projectSchema } from './_schemas';

const blogCollection = defineCollection({
  type: 'content',
  schema: blogSchema,
});

const projectCollection = defineCollection({
  type: 'content',
  schema: projectSchema,
});

export const collections = {
  blog: blogCollection,
  projects: projectCollection,
};
