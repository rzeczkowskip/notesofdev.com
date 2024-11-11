import type { CollectionSlug } from 'payload';

export type CollectionRoutingConfig = {
  slugFields: [string, ...string[]];
  hierarchical?: boolean;
  breadcrumbLabelFields?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  urlPathGenerator?: (doc?: any) => Promise<string | undefined>;
};

type CollectionsRoutingConfig = Partial<
  Record<CollectionSlug, CollectionRoutingConfig>
>;

export type PluginConfig = {
  collections: CollectionsRoutingConfig;
};
