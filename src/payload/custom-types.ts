import { CollectionSlug } from 'payload';

export type LinkField = {
  linkType: 'custom' | 'internal';
  url?: string | null;
  doc?: {
    relationTo: CollectionSlug | string;
    value: string | { routing: { path: string } };
  } | null;
  newTab?: boolean | null;
};
