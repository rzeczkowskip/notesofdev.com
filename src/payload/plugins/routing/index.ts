import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs';
import get from 'lodash/get';
import type {
  CollectionConfig,
  CollectionSlug,
  Config as PayloadConfig,
  Field,
  Plugin,
} from 'payload';
import hierarchicalFields from '@/payload/plugins/routing/fields/hierarchicalFields';
import routingGroup from '@/payload/plugins/routing/fields/routingGroup';
import { beforeValidate } from '@/payload/plugins/routing/hooks';
import {
  CollectionRoutingConfig,
  PluginConfig,
} from '@/payload/plugins/routing/types';

const getCollectionFields = (
  collection: CollectionConfig,
  routingConfig: CollectionRoutingConfig,
): Field[] => {
  return [
    ...collection.fields,
    routingGroup,
    ...hierarchicalFields(routingConfig, collection.slug as CollectionSlug),
  ];
};

const routingPlugin =
  (pluginConfig: PluginConfig): Plugin =>
  (incomingConfig: PayloadConfig) => {
    if (Object.keys(pluginConfig.collections).length === 0) {
      return incomingConfig;
    }

    const hierarchicalCollections: CollectionSlug[] = [];

    const config: PayloadConfig = {
      ...incomingConfig,
      collections: incomingConfig.collections?.map((collection) => {
        const collectionSlug = collection.slug as CollectionSlug;
        const collectionRoutingConfig =
          pluginConfig.collections?.[collectionSlug];

        if (!collectionRoutingConfig) {
          return collection;
        }

        if (collectionRoutingConfig.hierarchical) {
          hierarchicalCollections.push(collectionSlug);
        }

        return {
          ...collection,
          fields: getCollectionFields(collection, collectionRoutingConfig),
          hooks: {
            beforeValidate: [beforeValidate(collectionRoutingConfig)],
          },
        };
      }),
    };

    const originalNestedDocsPlugin = nestedDocsPlugin({
      collections: hierarchicalCollections,
      generateLabel: (_, doc) => {
        const labelFields: string[] =
          (doc?.breadcrumbLabelFields as string[]) || ['id'];

        return labelFields
          .map((field) => doc?.[field])
          .filter(Boolean)
          .join(' ');
      },
      generateURL: (_, currentDoc) => {
        const possiblePath = get(currentDoc, 'routing.path');
        return typeof possiblePath === 'string' ? possiblePath : '';
      },
    });

    return originalNestedDocsPlugin(config);
  };

export default routingPlugin;
