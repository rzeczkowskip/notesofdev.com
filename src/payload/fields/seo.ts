import merge from 'lodash/merge';
import type { CollectionSlug, FieldBase, GroupField } from 'payload';
import { CustomField } from './types';

type Options = {
  mediaCollection?: string | false;
  labels: {
    title: FieldBase['label'];
    description: FieldBase['label'];
    image: FieldBase['label'];
  };
  generateTitleFrom?: string;
};

const seo: CustomField<GroupField, Options> = (
  overrides,
  options = {},
): GroupField => {
  const fields: GroupField['fields'] = [
    {
      type: 'text',
      name: 'title',
      label: options?.labels?.title,
      maxLength: 60,
      hooks: {
        beforeChange: [
          ({ value, data }) => {
            if (options?.generateTitleFrom) {
              return value || data?.[options.generateTitleFrom];
            }

            return value;
          },
        ],
      },
    },
    {
      type: 'textarea',
      name: 'description',
      label: options?.labels?.description,
    },
  ];

  if (options.mediaCollection) {
    fields.push({
      name: 'image',
      type: 'upload',
      label: options?.labels?.image,
      relationTo: options.mediaCollection as CollectionSlug,
      required: false,
      filterOptions: {
        mimeType: { contains: 'image/' },
      },
    });
  }

  return {
    ...overrides,
    admin: merge(overrides?.admin || {}, {
      disableListColumn: true,
    } as FieldBase['admin']),
    type: 'group',
    interfaceName: 'SeoField',
    fields,
  } as GroupField;
};

export default seo;
