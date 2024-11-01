import type { CollectionOptions } from '@payloadcms/plugin-cloud-storage/types';
import { s3Storage as s3StorageBase } from '@payloadcms/storage-s3';
import type { Config, Plugin } from 'payload';

type S3PluginConfig = {
  enabled?: boolean;
  collections: string[];
  envPrefix?: string;
};

const EnvKeys = [
  'ACCESS_KEY_ID',
  'SECRET_ACCESS_KEY',
  'BUCKET',
  'REGION',
  'ENDPOINT',
  'PUBLIC_ENDPOINT',
] as const;

type S3Config = Record<(typeof EnvKeys)[number], string | undefined>;

const buildWarningMessageDetails = (
  s3Config: S3Config,
  collections: string[],
) => {
  const configValuesStatus = Object.entries(s3Config).map((key, value) => [
    key,
    Boolean(value),
  ]);

  return {
    collections,
    s3: {
      ...Object.fromEntries(configValuesStatus),
    },
  };
};

const s3Storage = (pluginConfig?: S3PluginConfig): Plugin => {
  return (incomingConfig: Config) => {
    if (pluginConfig?.enabled === false) {
      return incomingConfig;
    }

    const s3Config: S3Config = Object.fromEntries(
      EnvKeys.map((suffix) => {
        const key = `${pluginConfig?.envPrefix || 'S3'}_${suffix}`;
        return [suffix, process.env?.[key]];
      }),
    ) as S3Config;

    const isAvailable = !!(
      s3Config.ACCESS_KEY_ID &&
      s3Config.SECRET_ACCESS_KEY &&
      s3Config.BUCKET
    );

    const collections = pluginConfig?.collections || [];

    if (!isAvailable || collections.length === 0) {
      // eslint-disable-next-line no-console
      console.warn(
        'The S3 plugin has been added but is not available. Check configuration.',
        buildWarningMessageDetails(s3Config, collections),
      );

      return incomingConfig;
    }

    return s3StorageBase({
      collections: Object.fromEntries(
        collections.map((collection) => {
          const options: Omit<CollectionOptions, 'adapter'> = {
            disableLocalStorage: true,
            disablePayloadAccessControl: true,
            prefix: collection,
            generateFileURL: s3Config.PUBLIC_ENDPOINT
              ? (args) => {
                  return `${s3Config.PUBLIC_ENDPOINT}/${args.prefix}/${args.filename}`;
                }
              : undefined,
          };

          return [collection, options];
        }),
      ),
      disableLocalStorage: true,
      bucket: s3Config.BUCKET!,
      acl: 'public-read',
      config: {
        region: s3Config.REGION || '',
        forcePathStyle: true,
        credentials: {
          accessKeyId: s3Config.ACCESS_KEY_ID!,
          secretAccessKey: s3Config.SECRET_ACCESS_KEY!,
        },
        endpoint: s3Config.ENDPOINT,
      },
    })(incomingConfig);
  };
};

export default s3Storage;
