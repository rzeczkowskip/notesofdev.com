import internalTitle from '@/payload/fields/internalTitle';
import seo from '@/payload/fields/seo';
import ContentCollection from '@/payload/utils/ContentCollection';

export default ContentCollection(
  {
    slug: 'pages',
    admin: {
      useAsTitle: 'internalTitle',
      defaultColumns: ['internalTitle', 'title', 'routing.path'],
    },
    fields: [
      internalTitle({}, { generateFrom: 'title' }),
      {
        name: 'title',
        type: 'text',
        required: true,
        localized: true,
      },
      {
        name: 'showTitle',
        type: 'checkbox',
        defaultValue: true,
        localized: false,
        required: false,
        admin: {
          disableListColumn: true,
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
            admin: { disableListColumn: true },
          },
        ],
      },
      {
        label: 'SEO',
        fields: [
          seo(
            { name: 'seo', label: false },
            { mediaCollection: 'media', generateTitleFrom: 'title' },
          ),
        ],
      },
    ],
  },
);
