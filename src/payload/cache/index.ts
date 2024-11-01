import { buildCachedPayload } from '@payload-enchants/cached-local-api';
import { revalidateTag, unstable_cache } from 'next/cache';
import { CollectionSlug, GlobalSlug } from 'payload';
import { APP_DEBUG, DISABLE_CACHE } from '@/payload/contants';

const cachedRoutableCollections: CollectionSlug[] = ['posts', 'pages', 'tags'];
const cachedCollections: CollectionSlug[] = ['media'];
const cachedGlobals: GlobalSlug[] = ['siteConfig'];

export const { cachedPayloadPlugin, getCachedPayload } = buildCachedPayload({
  collections: [
    ...cachedRoutableCollections.map((slug) => ({
      slug,
      findOneFields: ['routing.path'],
    })),
    ...cachedCollections.map((slug) => ({ slug })),
  ],
  globals: [...cachedGlobals.map((slug) => ({ slug }))],
  loggerDebug: APP_DEBUG,
  options: {
    disableCache: DISABLE_CACHE,
  },
  revalidateTag,
  unstable_cache,
});
