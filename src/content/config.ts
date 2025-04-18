import { defineCollection } from 'astro:content';
import {
  blogSchema,
  noteSchema,
  projectSchema,
  timelineSchema,
} from './_schemas';

const blogCollection = defineCollection({
  type: 'content',
  schema: blogSchema,
});

const noteCollection = defineCollection({
  type: 'content',
  schema: noteSchema,
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
  notes: noteCollection,
  projects: projectCollection,
  education: timelineCollection,
  experience: timelineCollection,
};
