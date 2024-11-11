import { GroupField } from 'payload';
import slug from '@/payload/plugins/routing/fields/slug';

const routingGroup: GroupField = {
  type: 'group',
  name: 'routing',
  interfaceName: 'Routing',
  label: false,
  admin: {
    position: 'sidebar',
    hideGutter: true,
    components: {
      Cell: '@/payload/plugins/routing/components/RoutingListCell',
    },
  },
  fields: [
    slug,
    {
      name: 'internalPath',
      type: 'text',
      localized: true,
      unique: true,
      index: true,
      required: false,
      admin: {
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'path',
      label: 'URL path',
      type: 'text',
      required: true,
      unique: true,
      localized: true,
      admin: {
        readOnly: true,
      },
    },
  ],
};

export default routingGroup;
