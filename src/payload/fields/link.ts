import merge from 'lodash/merge';
import type { CollectionSlug, GroupField } from 'payload';
import { INTERNAL_LINK_COLLECTIONS } from '@/payload/contants';
import { CustomField } from '@/payload/fields/types';

type LinkFieldOptions = {
  withLabel: boolean;
  internalLinkCollections: CollectionSlug[];
};

const LinkType = {
  Custom: {
    label: 'Custom URL',
    value: 'custom',
  },
  Internal: {
    label: 'Internal link',
    value: 'internal',
  },
};

const link: CustomField<GroupField, LinkFieldOptions> = (
  overrides,
  options = {},
): GroupField => {
  const config: LinkFieldOptions = {
    withLabel: true,
    internalLinkCollections:
      options?.internalLinkCollections || INTERNAL_LINK_COLLECTIONS,
    ...options,
  };

  const hasInternalLink = config.internalLinkCollections?.length > 0;

  const fields: GroupField['fields'] = [];

  if (config.withLabel) {
    fields.push({
      name: 'label',
      label: 'Label',
      type: 'text',
      required: true,
    });
  }

  fields.push(
    {
      type: 'row',
      fields: [
        {
          name: 'linkType',
          type: 'radio',
          required: true,
          admin: {
            layout: 'horizontal',
          },
          options: hasInternalLink
            ? Object.values(LinkType)
            : [LinkType.Custom],
          defaultValue: LinkType.Custom.value,
        },
      ],
    },
    {
      name: 'url',
      label: LinkType.Custom.label,
      type: 'text',
      required: true,
      admin: {
        condition: (_, siblingData) =>
          !hasInternalLink || siblingData?.linkType === LinkType.Custom.value,
      },
    },
    {
      name: 'doc',
      label: LinkType.Internal.label,
      type: 'relationship',
      relationTo: config.internalLinkCollections,
      required: true,
      maxDepth: 1,
      admin: {
        condition: (_, siblingData) =>
          siblingData?.linkType === LinkType.Internal.value,
      },
    },
    {
      name: 'newTab',
      label: 'Open in new tab',
      type: 'checkbox',
    },
  );

  const fieldDefaults: Partial<GroupField> = {
    type: 'group',
    interfaceName: 'LinkField',
    admin: {
      hideGutter: true,
    },
    fields,
  };

  return merge(fieldDefaults, overrides) as GroupField;
};

export default link;
