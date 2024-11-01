import merge from 'lodash/merge';
import type { CollectionConfig, Field, UnnamedTab } from 'payload';

type CollectionConfigOverrides = Partial<CollectionConfig> &
  Pick<CollectionConfig, 'slug'>;

type PreconfiguredCollection<T extends object | void = void> = (
  overrides: CollectionConfigOverrides,
  options?: T,
) => CollectionConfig;

type ContentCollectionConfig = {
  tabs?: UnnamedTab[];
  fields?: Field[];
  sectionFields?: Field[];
  hasContentSections?: boolean;
};

const ContentCollection: PreconfiguredCollection<ContentCollectionConfig> = (
  overrides,
  config,
) => {
  const baseConfig: CollectionConfig = {
    access: {
      read: () => true,
    },
    slug: overrides.slug,
    versions: {
      drafts: false,
    },
    fields: [
      ...(overrides.fields || []),
      {
        type: 'tabs',
        tabs: [...(config?.tabs || [])],
      },
    ],
  };

  return merge(baseConfig, { ...overrides, fields: undefined });
};

export default ContentCollection;
