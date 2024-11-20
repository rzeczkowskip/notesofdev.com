import internalTitle from '@/payload/fields/internalTitle';
import seo from '@/payload/fields/seo';
import ContentCollection from '@/payload/utils/ContentCollection';

export default ContentCollection(
  {
    slug: 'projects',
    admin: {
      useAsTitle: 'internalTitle',
      defaultColumns: ['internalTitle', 'name', 'routing.path'],
    },
    fields: [
      internalTitle({}, { generateFrom: 'name' }),
      {
        name: 'name',
        type: 'text',
        required: true,
        localized: true,
      },
      {
        name: 'image',
        type: 'upload',
        label: 'Image',
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
        name: 'url',
        type: 'text',
      },
      {
        name: 'featured',
        type: 'checkbox',
        required: false,
      },
    ],
  },
  {
    tabs: [
      {
        label: 'Content',
        fields: [
          {
            name: 'shortDescription',
            type: 'richText',
            required: false,
            localized: true,
            admin: {
              disableListColumn: true,
            },
          },
          {
            type: 'richText',
            name: 'description',
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
              generateTitleFrom: 'name',
              copyImageFrom: 'image',
            },
          ),
        ],
      },
    ],
  },
);
