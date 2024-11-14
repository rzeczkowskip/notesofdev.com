import merge from 'lodash/merge';
import type { CollectionSlug, FieldBase, FieldHook, GroupField } from 'payload';
import { CustomField } from './types';

type Options = {
  mediaCollection?: string | false;
  labels: {
    title: FieldBase['label'];
    description: FieldBase['label'];
    image: FieldBase['label'];
  };
  generateTitleFrom?: string;
  copyImageFrom?: string;
};

const generatedDataHook =
  (options: Partial<Options>): FieldHook =>
  ({ data }) => {
    return {
      title:
        data?.seo?.title ||
        (options.generateTitleFrom && data?.[options.generateTitleFrom]),
      description: data?.seo?.description || '',
      image:
        data?.seo?.image ||
        (options.copyImageFrom && data?.[options.copyImageFrom]) ||
        null,
    };
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
      required: !options.generateTitleFrom,
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

  fields.push({
    type: 'group',
    name: 'generated',
    admin: {
      readOnly: true,
      hidden: true,
    },
    hooks: {
      afterRead: [generatedDataHook(options)],
    },
    fields: [
      { type: 'text', name: 'title' },
      { type: 'text', name: 'description' },
      {
        type: 'upload',
        name: 'image',
        required: false,
        relationTo: options.mediaCollection as CollectionSlug,
      },
    ],
  });

  return {
    ...overrides,
    admin: merge(overrides?.admin || {}, {
      disableListColumn: true,
    } as FieldBase['admin']),
    type: 'group',
    interfaceName: 'SeoField',
    localized: true,
    fields,
  } as GroupField;
};

export default seo;
