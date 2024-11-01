import get from 'lodash/get';
import type { Where, BasePayload, CollectionSlug, FieldHook } from 'payload';
import slugify from 'slugify';

const dedupeSlug = async (
  payload: BasePayload,
  collection: string,
  fieldPath: string,
  currentSlug: string,
  currentId?: string,
): Promise<string> => {
  const where: Where[] = [
    {
      [fieldPath]: {
        like: currentSlug,
      },
    },
  ];

  if (currentId) {
    where.push({
      id: { not_equals: currentId },
    });
  }

  const others = await payload.find({
    collection: collection as CollectionSlug,
    depth: 0,
    where: {
      and: where,
    },
  });

  const slugs = others.docs
    .map((doc) => {
      return get(doc, fieldPath);
    })
    .filter((slug: string) => {
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
    dedupedSlug = `${currentSlug}-${suffix}`;
    suffix += 1;
  }

  return dedupedSlug;
};

const beforeValidate: (useFields: string[]) => FieldHook = (useFields) => {
  return async ({
    originalDoc: { id },
    value,
    data,
    siblingData,
    schemaPath,
    req,
    collection,
  }) => {
    const possibleValue =
      siblingData?.auto === false || value
        ? value
        : useFields
            .map((field) => get(data, field))
            .filter(Boolean)
            .join(' ');

    if (!possibleValue) {
      return possibleValue;
    }

    const slug = slugify(possibleValue.replace(/[/]+/g, ' '), {
      lower: true,
      trim: true,
    });

    if (!collection?.slug) {
      return slug;
    }

    return dedupeSlug(
      req.payload,
      collection.slug,
      schemaPath.join('.'),
      slug,
      id,
    );
  };
};

export default beforeValidate;
