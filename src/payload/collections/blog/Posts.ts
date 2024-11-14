import { CollectionSlug } from 'payload';
import Tags from '@/payload/collections/blog/Tags';
import internalTitle from '@/payload/fields/internalTitle';
import publishedAt from '@/payload/fields/publishedAt';
import seo from '@/payload/fields/seo';
import ContentCollection from '@/payload/utils/ContentCollection';

export default ContentCollection(
  {
    slug: 'posts',
    admin: {
      useAsTitle: 'internalTitle',
      defaultColumns: ['internalTitle', 'title', 'routing.path', 'tags'],
    },
    fields: [
      internalTitle({}, { generateFrom: 'title' }),
      publishedAt({ name: 'publishedAt' }),
      {
        name: 'title',
        type: 'text',
        required: true,
        localized: true,
      },
      {
        name: 'intro',
        type: 'richText',
        required: false,
        localized: true,
        admin: {
          disableListColumn: true,
        },
      },
      {
        name: 'poster',
        type: 'upload',
        label: 'Poster',
        relationTo: 'media',
        required: false,
        localized: true,
        filterOptions: {
          mimeType: { contains: 'image/' },
        },
        admin: {
          disableListFilter: true,
          disableListColumn: true,
        },
      },
      {
        name: 'tags',
        type: 'relationship',
        hasMany: true,
        relationTo: Tags.slug as CollectionSlug,
        maxDepth: 1,
        admin: {
          isSortable: false,
          allowCreate: true,
          position: 'sidebar',
        },
      },
    ],
  },
  {
    tabs: [
      {
        label: 'Content',
        fields: [
          {
            type: 'richText',
            name: 'content',
            label: false,
            localized: true,
            admin: {
              disableListColumn: true,
            },
          },
        ],
      },
      {
        label: 'SEO',
        fields: [
          seo(
            { name: 'seo', label: false },
            {
              mediaCollection: 'media',
              generateTitleFrom: 'title',
              copyImageFrom: 'poster',
            },
          ),
        ],
      },
    ],
  },
);
