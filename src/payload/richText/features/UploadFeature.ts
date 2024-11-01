import { UploadFeature as PayloadUploadFeature } from '@payloadcms/richtext-lexical';
import type { CollectionConfig, CollectionSlug, Field } from 'payload';

const UploadFeature = (
  mediaCollections: CollectionSlug[],
  linkFieldConfig?: Omit<Field, 'name'>,
) => {
  const linkFields: Field[] = linkFieldConfig
    ? [
        {
          name: 'enableLink',
          type: 'checkbox',
          label: 'Enable Link',
        },
        {
          name: 'link',
          ...linkFieldConfig,
          admin: {
            ...(linkFieldConfig.admin || {}),
            condition: (data, siblingData, context) => {
              const isEnabled = Boolean(data?.enableLink);
              const originalCondition =
                linkFieldConfig?.admin?.condition ?? (() => true);

              return isEnabled && originalCondition(data, siblingData, context);
            },
          },
        } as Field,
      ]
    : [];

  const mediaCollectionConfig: Pick<CollectionConfig, 'fields'> = {
    fields: [
      {
        type: 'textarea',
        name: 'caption',
        label: 'Caption',
      },
      {
        type: 'radio',
        name: 'alignment',
        label: 'Alignment',
        options: [
          {
            label: 'Left',
            value: 'left',
          },
          {
            label: 'Center',
            value: 'center',
          },
          {
            label: 'Right',
            value: 'right',
          },
        ],
      },
      ...linkFields,
    ],
  };

  return PayloadUploadFeature({
    collections: Object.fromEntries(
      mediaCollections.map((slug) => [slug, mediaCollectionConfig]),
    ),
  });
};

export default UploadFeature;
