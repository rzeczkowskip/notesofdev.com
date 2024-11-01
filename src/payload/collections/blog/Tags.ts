import internalTitle from '@/payload/fields/internalTitle';
import seo from '@/payload/fields/seo';
import ContentCollection from '@/payload/utils/ContentCollection';

export default ContentCollection(
  {
    slug: 'tags',
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
    ],
  },
  {
    tabs: [
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
