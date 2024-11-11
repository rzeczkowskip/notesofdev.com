import type { GlobalConfig } from 'payload';
import nav from '@/payload/fields/nav';

const SiteConfig: GlobalConfig = {
  slug: 'siteConfig',
  access: {
    read: () => true,
  },
  versions: {
    drafts: false,
  },
  admin: {
    group: 'System',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          name: 'general',
          label: 'General',
          fields: [
            {
              type: 'text',
              name: 'title',
              required: true,
              localized: true,
            },
            {
              type: 'text',
              name: 'baseUrl',
              required: false,
              localized: true,
            },
          ],
        },
        {
          name: 'nav',
          label: 'Nav',
          fields: [
            nav({ name: 'main' }, { maxSubmenuLevel: 0 }),
            nav({ name: 'footer' }, { maxSubmenuLevel: 1 }),
          ],
        },
      ],
    },
  ],
};

export default SiteConfig;
