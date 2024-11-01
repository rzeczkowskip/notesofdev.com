import merge from 'lodash/merge';
import type { ArrayField } from 'payload';
import link from '@/payload/fields/link';
import { CustomField } from '@/payload/fields/types';

type NavFieldOptions = {
  maxSubmenuLevel: number;
};

const NavItemType = {
  Submenu: 'submenu',
  Link: 'link',
} as const;

const nav: CustomField<ArrayField, NavFieldOptions> = (
  overrides,
  options = {},
): ArrayField => {
  const config: NavFieldOptions = {
    ...options,
    maxSubmenuLevel: options?.maxSubmenuLevel || 0,
  };

  const fields: ArrayField['fields'] = [
    {
      name: 'label',
      label: 'Label',
      type: 'text',
      required: true,
    },
  ];

  if (config.maxSubmenuLevel > 0) {
    fields.push({
      type: 'row',
      fields: [
        {
          name: 'type',
          type: 'radio',
          admin: {
            layout: 'horizontal',
          },
          options: Object.values(NavItemType),
          defaultValue: NavItemType.Link,
        },
      ],
    });

    fields.push(
      nav(
        {
          name: 'items',
          admin: {
            condition: (_, data) => data?.type === NavItemType.Submenu,
          },
        },
        {
          ...config,
          maxSubmenuLevel: config.maxSubmenuLevel - 1,
        },
      ),
    );
  }

  fields.push(
    link(
      {
        interfaceName: 'NavLinkItem',
        name: 'link',
        admin: {
          condition: (_, data) =>
            config.maxSubmenuLevel === 0 || data?.type === NavItemType.Link,
        },
      },
      {
        withLabel: false,
      },
    ),
  );

  const fieldDefaults: Partial<ArrayField> = {
    type: 'array',
    interfaceName: 'Nav',
    fields,
  };

  return merge(fieldDefaults, overrides) as ArrayField;
};

export default nav;
