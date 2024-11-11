import {
  createBreadcrumbsField,
  createParentField,
} from '@payloadcms/plugin-nested-docs';
import type { CollectionSlug, Field } from 'payload';
import { CollectionRoutingConfig } from '@/payload/plugins/routing/types';

const hierarchicalFields = (
  routingConfig: CollectionRoutingConfig,
  collectionSlug?: CollectionSlug,
): Field[] => {
  if (!collectionSlug || !routingConfig.hierarchical) {
    return [];
  }

  return [
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
        disableListFilter: true,
        disableListColumn: true,
      },
    }),
    {
      type: 'json',
      name: 'breadcrumbLabelFields',
      admin: {
        readOnly: true,
        hidden: true,
        disableListColumn: true,
        disableListFilter: true,
      },
      defaultValue:
        routingConfig.breadcrumbLabelFields || routingConfig.slugFields,
    },
  ];
};

export default hierarchicalFields;
