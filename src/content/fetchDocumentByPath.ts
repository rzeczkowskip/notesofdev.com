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

  return client.findOne({
    collection,
    field: 'routing.path',
    value: fullPath,
  });
};

export default fetchDocumentByPath;
