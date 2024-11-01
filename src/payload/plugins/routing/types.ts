import type { CollectionSlug } from 'payload';

type CollectionRoutingConfig = {
  slugFields: string[];
  hierarchical?: boolean;
  breadcrumbLabelFields?: string[];
};

export type CollectionsRoutingConfig = Partial<
  Record<CollectionSlug, CollectionRoutingConfig>
>;

export type PluginConfig = { collections: CollectionsRoutingConfig };
