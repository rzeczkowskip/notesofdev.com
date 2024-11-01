import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs';
import type { CollectionSlug, Config, Field, Plugin } from 'payload';
import { routingFields, treeFields } from './fields';
import {
  CollectionsRoutingConfig,
  PluginConfig,
} from '@/payload/plugins/routing/types';

const preconfigureFields = (
  routingConfig: CollectionsRoutingConfig,
  incomingConfig: Config,
): [Config, string[]] => {
  const hierarchicalCollections: string[] = [];

  const config: Config = {
    ...incomingConfig,
    collections: incomingConfig?.collections?.map((collection) => {
      const collectionRouting =
        routingConfig?.[collection.slug as CollectionSlug];

      if (!collectionRouting) {
        return collection;
      }

      const fields: Field[] = [
        ...collection.fields,
        {
          interfaceName: 'Routing',
          type: 'group',
          name: 'routing',
          fields: routingFields(
            collectionRouting.slugFields,
            collectionRouting?.hierarchical,
          ),
          admin: {
            position: 'sidebar',
            hideGutter: true,
            components: {
              Cell: '@/payload/plugins/routing/components/ListCell',
            },
          },
        },
      ];

      if (collectionRouting?.hierarchical) {
        hierarchicalCollections.push(collection.slug);
        fields.push(
          ...treeFields(
            collection.slug,
            collectionRouting?.breadcrumbLabelFields ||
              collectionRouting.slugFields,
          ),
        );
      }

      return {
        ...collection,
        fields,
      };
    }),
  };

  return [config, hierarchicalCollections];
};

const routingPlugin =
  (pluginConfig: PluginConfig): Plugin =>
  (incomingConfig: Config) => {
    if (Object.keys(pluginConfig.collections).length === 0) {
      return incomingConfig;
    }

    const [config, hierarchicalCollections] = preconfigureFields(
      pluginConfig.collections,
      incomingConfig,
    );

    const originalNestedDocsPlugin = nestedDocsPlugin({
      collections: hierarchicalCollections,
      generateLabel: (_: unknown, doc: Record<string, unknown>) => {
        const labelFields: string[] =
          (doc?.breadcrumbLabelFields as string[]) || ['id'];

        return labelFields
          .map((field) => doc?.[field])
          .filter(Boolean)
          .join(' ');
      },
      generateURL: (
        docs: Record<string, unknown>[],
        currentDoc: Record<string, unknown>,
      ) => {
        const parent = docs.slice(-2, -1).pop();

        // @ts-expect-error we can ignore undefined here
        const parentUrl = parent?.routing?.path?.replace(/^\/|\/$/, '') || '';
        // @ts-expect-error we can ignore undefined here
        const slug = currentDoc?.routing?.slug?.value;

        const rawUrl = [parentUrl, slug].filter(Boolean).join('/');

        return `/${rawUrl.replace(/^\/|\/{2,}/g, '')}`;
      },
    });

    return originalNestedDocsPlugin(config);
  };

export default routingPlugin;
