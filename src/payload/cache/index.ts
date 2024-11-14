import { buildCachedPayload } from '@payload-enchants/cached-local-api';
import { revalidateTag, unstable_cache } from 'next/cache';
import { CollectionSlug, DataFromCollectionSlug, GlobalSlug } from 'payload';
import { APP_DEBUG, DISABLE_CACHE } from '@/payload/contants';

const cachedRoutableCollections: CollectionSlug[] = ['posts', 'pages', 'tags'];
const cachedCollections: CollectionSlug[] = ['media'];
const cachedGlobals: GlobalSlug[] = ['siteConfig'];

export const { cachedPayloadPlugin, getCachedPayload } = buildCachedPayload({
  collections: [
    ...cachedRoutableCollections.map((slug) => ({
      slug,
      findOneFields: [
        {
          name: 'routing.internalPath',
          getFieldFromDoc: (doc: DataFromCollectionSlug<typeof slug>) =>
            // @ts-expect-error if no routing, we can get undefined fine
            doc?.routing?.internalPath,
        },
      ],
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
