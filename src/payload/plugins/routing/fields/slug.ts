import type { GroupField } from 'payload';

const slug: GroupField = {
  name: 'slug',
  type: 'group',
  label: false,
  localized: true,
  admin: {
    hideGutter: true,
  },
  fields: [
    {
      type: 'text',
      name: 'value',
      label: 'Slug',
    },
    {
      type: 'checkbox',
      required: false,
      name: 'auto',
      label: 'Auto generate',
      defaultValue: true,
    },
  ],
};

export default slug;
