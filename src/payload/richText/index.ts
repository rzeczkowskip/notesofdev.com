import {
  FeatureProviderServer,
  FixedToolbarFeature,
  lexicalEditor,
  LinkFeature,
  TreeViewFeature,
} from '@payloadcms/richtext-lexical';
import type { Block, CollectionSlug, Config, Field } from 'payload';
import BlocksFeature from './features/BlocksFeature';
import UploadFeature from './features/UploadFeature';

type RichTextEditorOptions = {
  debug?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  features: FeatureProviderServer<any, any, any>[];
  mediaCollections: CollectionSlug[];
  linkableCollections: CollectionSlug[];
  mediaLinkField?: Field;
  blocks: Block[];
  inlineBlocks: Block[];
  maxNesting?: number;
};

const getEditorConfig: (
  options: Partial<RichTextEditorOptions>,
) => Config['editor'] = (options) => {
  const config: RichTextEditorOptions = {
    debug: false,
    features: [],
    mediaCollections: [],
    linkableCollections: [],
    blocks: [],
    inlineBlocks: [],
    ...options,
  };

  const maxNesting = options.maxNesting ?? 2;
  const canHaveNestedItems = maxNesting > 0;

  const nestedEditorConfig: RichTextEditorOptions = {
    ...config,
    maxNesting: Math.max(0, maxNesting - 1),
  };

  const conditionalFeatures = [
    canHaveNestedItems &&
    (config.blocks.length > 0 || config.inlineBlocks.length > 0)
      ? BlocksFeature(
          {
            blocks: config.blocks,
            inlineBlocks: config.inlineBlocks,
          },
          getEditorConfig(nestedEditorConfig),
        )
      : false,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ].filter(Boolean) as FeatureProviderServer<any, any, any>[];

  return lexicalEditor({
    features: ({ defaultFeatures }) => {
      return [
        ...defaultFeatures.filter(
          (feature) => !['upload', 'link'].includes(feature.key),
        ),
        UploadFeature(
          config.mediaCollections as CollectionSlug[],
          config.mediaLinkField,
        ),
        LinkFeature({
          enabledCollections: config.linkableCollections as CollectionSlug[],
        }),
        ...conditionalFeatures,
        ...(config.debug === true ? [TreeViewFeature()] : []),
        ...(config.features || []),
        FixedToolbarFeature({}),
      ];
    },
  });
};

export default getEditorConfig;
