import { CollectionSlug } from 'payload';

const normalizePath = (path: string) => {
  return `/${path.replace(/^\/*|\/*$/g, '').replace(/\/{2,}/g, '/')}`;
};

const getPath = (collection: CollectionSlug, path: string) => {
  switch (collection) {
    case 'posts':
      return `/blog/${path}`;
    case 'tags':
      return `/tags/${path}`;
    default:
      return path;
  }
};

const getContentTypePath = (
  collection: CollectionSlug,
  path?: string | null,
) => {
  return normalizePath(getPath(collection, path || ''));
};

export default getContentTypePath;
