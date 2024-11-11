import get from 'lodash/get';
import {
  CollectionBeforeValidateHook,
  CollectionSlug,
  DataFromCollectionSlug,
  PayloadRequest,
  Where,
} from 'payload';
import slugify from 'slugify';
import { CollectionRoutingConfig } from '@/payload/plugins/routing/types';
import { normalizePath } from '@/payload/plugins/routing/utils/path';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ContentData = Partial<any>;

const dedupeSlug = async ({
  req,
  collectionSlug,
  currentSlug,
  currentId,
}: {
  req: PayloadRequest;
  collectionSlug: CollectionSlug;
  currentSlug: string;
  currentId?: string;
}): Promise<string> => {
  const where: Where[] = [
    {
      ['routing.slug.value']: {
        like: currentSlug,
      },
    },
  ];

  if (currentId) {
    where.push({
      id: { not_equals: currentId },
    });
  }

  const others = await req.payload.find({
    collection: collectionSlug,
    depth: 0,
    where: {
      and: where,
    },
  });

  const slugs = others.docs
    .map((doc) => {
      return get(doc, 'routing.slug.value');
    })
    .filter((slug) => {
      if (typeof slug !== 'string') {
        return false;
      }

      return (
        slug === currentSlug ||
        new RegExp(`^${currentSlug}-[0-9]+$`, 'i').test(slug)
      );
    });

  let dedupedSlug = currentSlug;
  let suffix = slugs.length;

  while (slugs.includes(dedupedSlug)) {
    suffix += 1;
    dedupedSlug = `${currentSlug}-${suffix}`;
  }

  return dedupedSlug;
};

const generateSlug = async ({
  data,
  useFields,
  collectionSlug,
  req,
  currentId,
}: {
  data: ContentData;
  useFields: string[];
  collectionSlug?: CollectionSlug;
  req: PayloadRequest;
  currentId?: string;
}): Promise<string | undefined> => {
  const possibleValue =
    data.routing.slug.auto === false || data.routing.slug.value
      ? data.routing.slug.value
      : useFields
          .map((field) => get(data, field))
          .filter(Boolean)
          .join(' ');

  if (!possibleValue) {
    return possibleValue;
  }

  const slug = slugify(possibleValue.replace(/\/+/g, ' '), {
    lower: true,
    trim: true,
  });

  if (!collectionSlug) {
    return slug;
  }

  return await dedupeSlug({
    req,
    collectionSlug,
    currentSlug: slug,
    currentId,
  });
};

const generateInternalPath = async ({
  routingConfig,
  slugToUse,
  data,
  collectionSlug,
  req,
}: {
  routingConfig: CollectionRoutingConfig;
  slugToUse?: string;
  data: ContentData;
  collectionSlug?: CollectionSlug;
  req: PayloadRequest;
}): Promise<string | undefined> => {
  if (!data || !collectionSlug || slugToUse === undefined) {
    return undefined;
  }

  if (!routingConfig.hierarchical || !data.parent) {
    return normalizePath(slugToUse);
  }

  const parent = await req.payload.findByID({
    collection: collectionSlug as CollectionSlug,
    id: data.parent,
  });

  if ('routing' in parent) {
    return normalizePath(`${parent.routing.internalPath}/${slugToUse}`);
  }

  return undefined;
};

const generateUrlPath = async ({
  routingConfig,
  data,
}: {
  routingConfig: CollectionRoutingConfig;
  data: ContentData;
}): Promise<string | undefined> => {
  if (!data?.routing?.internalPath) {
    return undefined;
  }

  const path = routingConfig.urlPathGenerator
    ? await routingConfig.urlPathGenerator(
        data as DataFromCollectionSlug<CollectionSlug>,
      )
    : data.routing.internalPath;

  return normalizePath(path);
};

export const beforeValidate =
  (routingConfig: CollectionRoutingConfig): CollectionBeforeValidateHook =>
  async ({ data, req, collection, originalDoc }) => {
    if (!data) {
      return data;
    }

    const collectionSlug = collection.slug as CollectionSlug;

    const slug = await generateSlug({
      data,
      req,
      collectionSlug,
      useFields: routingConfig.slugFields,
      currentId: originalDoc?.id,
    });

    const internalPath = await generateInternalPath({
      data,
      req,
      slugToUse: slug,
      collectionSlug,
      routingConfig,
    });

    const updatedData: ContentData = {
      ...data,
      routing: {
        slug: { ...data.routing.slug, value: slug },
        internalPath,
        path: undefined,
      },
    };

    const urlPath = await generateUrlPath({
      routingConfig,
      data: updatedData,
    });

    return {
      ...updatedData,
      routing: {
        ...updatedData.routing,
        path: urlPath,
      },
    };
  };
