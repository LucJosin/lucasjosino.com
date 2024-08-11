import type { i18nSchema } from 'i18n/schema';
import { s404 } from './404';
import { about } from './about';
import { blog } from './blog';
import { categories } from './categories';
import { common } from './common';
import { home } from './home';
import { projects } from './projects';
import { tags } from './tags';

export const ptLocale: i18nSchema = {
  '404': s404,
  about,
  blog,
  categories,
  common,
  home,
  projects,
  tags,
};
