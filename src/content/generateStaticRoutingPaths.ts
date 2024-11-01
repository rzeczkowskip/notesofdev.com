import type { CollectionSlug } from 'payload';
import { getPayload } from '@/payload/client';

const generateStaticRoutingPaths = async (
  collection: CollectionSlug,
  options?: {
    paramName?: string;
    pathAsArray?: boolean;
  },
) => {
  const payload = await getPayload();
  const items = await payload.find({
    collection,
    draft: false,
    pagination: false,
    overrideAccess: false,
  });

  return items.docs
    .filter((item) => {
      return (
        item &&
        'routing' in item &&
        item.routing &&
        'path' in item.routing &&
        typeof item.routing.path === 'string'
      );
    })
    .map((item) => {
      // @ts-expect-error filter above checked if routing is available
      const path = item.routing!.path!.substring(1);

      return {
        [options?.paramName || 'path']:
          options?.pathAsArray === true ? path.split('/') : path,
      };
    });
};

export default generateStaticRoutingPaths;
