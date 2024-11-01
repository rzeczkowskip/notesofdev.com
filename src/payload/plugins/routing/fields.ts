import {
  createBreadcrumbsField,
  createParentField,
} from '@payloadcms/plugin-nested-docs';
import type { Field } from 'payload';
import slug from '@/payload/plugins/routing/fields/slug';
import { buildPath } from '@/payload/plugins/routing/utils/path';

export const routingFields = (
  slugFields: string[],
  hierarchical?: boolean,
): Field[] => [
  slug({
    useFields: slugFields,
  }),
  {
    name: 'path',
    label: 'URI',
    type: 'text',
    localized: true,
    unique: true,
    index: true,
    admin: {
      readOnly: true,
      position: 'sidebar',
    },
    hooks: {
      beforeChange: [
        async ({ data }) => {
          if (!hierarchical) {
            return data?.routing?.slug?.value
              ? buildPath(data?.routing?.slug?.value)
              : undefined;
          }

          if (
            !Array.isArray(data?.breadcrumbs) ||
            data.breadcrumbs.length === 0
          ) {
            return undefined;
          }

          const lastItem = data.breadcrumbs.pop();
          return lastItem.url;
        },
      ],
    },
  },
];

export const treeFields = (
  collectionSlug: string,
  breadcrumbLabelFields: string[],
): Field[] => [
  createParentField(collectionSlug, {
    name: 'parent',
    admin: {
      position: 'sidebar',
    },
  }),
  createBreadcrumbsField(collectionSlug, {
    name: 'breadcrumbs',
    admin: {
      hidden: true,
      readOnly: true,
    },
  }),
  {
    type: 'json',
    name: 'breadcrumbLabelFields',
    admin: {
      readOnly: true,
      hidden: true,
      disableListColumn: true,
    },
    defaultValue: breadcrumbLabelFields,
  },
];
