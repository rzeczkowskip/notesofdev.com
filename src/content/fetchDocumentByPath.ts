import { CollectionSlug } from 'payload';
import { getPayload } from '@/payload/client';

const fetchDocumentByPath = async <T extends CollectionSlug>(
  collection: T,
  path: string | string[],
) => {
  const normalizedPath = Array.isArray(path) ? path.join('/') : path;
  const fullPath = normalizedPath.startsWith('/')
    ? normalizedPath
    : `/${normalizedPath}`;

  const client = await getPayload();

  // @ts-expect-error cache plugin issue
  return client.findOne({
    collection,
    field: 'routing.internalPath',
    value: fullPath,
  });
};

export default fetchDocumentByPath;
