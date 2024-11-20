// storage-adapter-import-placeholder
import path from 'path';
import { fileURLToPath } from 'url';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { buildConfig, CollectionSlug } from 'payload';
import sharp from 'sharp';

import CalloutBlock from '@/payload/blocks/CalloutBlock';
import CodeBlock from '@/payload/blocks/CodeBlock';
import LatestPostsBlock from '@/payload/blocks/LatestPostsBlock';
import { cachedPayloadPlugin } from '@/payload/cache';
import Admins from '@/payload/collections/Admins';
import Media from '@/payload/collections/Media';
import Pages from '@/payload/collections/Pages';
import Projects from '@/payload/collections/Projects';
import Posts from '@/payload/collections/blog/Posts';
import Tags from '@/payload/collections/blog/Tags';
import { INTERNAL_LINK_COLLECTIONS } from '@/payload/contants';
import { APP_DEBUG, CONTENT_LOCALES } from '@/payload/contants';
import link from '@/payload/fields/link';
import SiteConfig from '@/payload/globals/SiteConfig';
import routing from '@/payload/plugins/routing';
import s3Storage from '@/payload/plugins/s3Storage';
import getEditorConfig from '@/payload/richText';
import groupContentTypes from '@/payload/utils/groupContentTypes';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Admins.slug,
    avatar: 'default',
    importMap: {
      baseDir: path.resolve(dirname),
    },
    dependencies: {
      treeView: {
        path: '@payloadcms/richtext-lexical/client#TreeViewFeatureClient',
        type: 'component',
      },
    },
  },
  defaultDepth: 10,
  maxDepth: 20,
  localization: {
    locales: CONTENT_LOCALES,
    defaultLocale: CONTENT_LOCALES[0],
  },
  collections: groupContentTypes(
    {
      items: [Pages, Media],
    },
    {
      group: 'Blog',
      items: [Posts, Tags],
    },
    { items: [Projects] },
    {
      group: 'System',
      items: [Admins],
    },
  ),
  globals: groupContentTypes({
    group: 'System',
    items: [SiteConfig],
  }),
  editor: getEditorConfig({
    debug: APP_DEBUG,
    mediaCollections: [Media.slug] as CollectionSlug[],
    linkableCollections: INTERNAL_LINK_COLLECTIONS,
    mediaLinkField: link(
      {},
      {
        withLabel: false,
        withSelfLink: true,
      },
    ),
    blocks: [CodeBlock, LatestPostsBlock, CalloutBlock],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    cachedPayloadPlugin,
    s3Storage({
      collections: [Media.slug],
      enabled: process.env.S3_DISABLED !== '1',
    }),
    routing({
      collections: {
        pages: {
          slugFields: ['title'],
          hierarchical: true,
          urlPathGenerator: async (doc) => {
            return doc?.routing?.internalPath;
          },
        },
        posts: {
          slugFields: ['title'],
          hierarchical: false,
          urlPathGenerator: async (doc) =>
            `/blog/${doc?.routing?.internalPath}`,
        },
        tags: {
          slugFields: ['title'],
          hierarchical: false,
          urlPathGenerator: async (doc) =>
            `/tags/${doc?.routing?.internalPath}`,
        },
        projects: {
          slugFields: ['name'],
          hierarchical: false,
          urlPathGenerator: async (doc) =>
            `/projects/${doc?.routing?.internalPath}`,
        },
      },
    }),
  ],
});
