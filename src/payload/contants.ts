import * as process from 'node:process';
import type { CollectionSlug } from 'payload';
import { LOCALES } from '@/contants';

export { APP_DEBUG } from '@/contants';
export const DISABLE_CACHE = process.env.APP_CACHE_DISABLE === '1';

export const CONTENT_LOCALES = LOCALES;

export const INTERNAL_LINK_COLLECTIONS: CollectionSlug[] = [
  'pages',
  'tags',
  'posts',
];
