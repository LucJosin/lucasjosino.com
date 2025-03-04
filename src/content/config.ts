import { defineCollection } from 'astro:content';
import { blogSchema, projectSchema, timelineSchema } from './_schemas';

const blogCollection = defineCollection({
  type: 'content',
  schema: blogSchema,
});

const projectCollection = defineCollection({
  type: 'content',
  schema: projectSchema,
});

const timelineCollection = defineCollection({
  type: 'data',
  schema: timelineSchema,
});

export const collections = {
  blog: blogCollection,
  projects: projectCollection,
  education: timelineCollection,
  experience: timelineCollection,
};
