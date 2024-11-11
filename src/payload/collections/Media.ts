import type { CollectionConfig } from 'payload';
import internalTitle from '@/payload/fields/internalTitle';

const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'var/uploads/media',
    imageSizes: [{ name: 'thumbnail', width: 200, height: 200 }],
    adminThumbnail: ({ doc: media }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (media?.sizes as any)?.thumbnail?.url || media.url;
    },
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'internalTitle',
    defaultColumns: ['filename', 'internalTitle', 'mimeType', 'filesize'],
  },
  fields: [
    internalTitle({}, { generateFrom: 'filename' }),
    {
      name: 'alt',
      type: 'text',
      localized: true,
    },
    {
      localized: true,
      name: 'source',
      type: 'text',
    },
  ],
};

export default Media;
