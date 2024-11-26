import merge from 'lodash/merge';
import { Metadata } from 'next';
import { CollectionSlug, TypedCollection } from 'payload';
import getSiteConfig from '@/content/getSiteConfig';
import { SeoField } from '@/payload/payload-types';
import extractImageMediaProps from '@/utils/extractMediaLink';

const extractPageSeoData = (data?: SeoField) => {
  return {
    title: data?.generated?.title || undefined,
    description: data?.generated?.description || undefined,
    image:
      typeof data?.image === 'object'
        ? extractImageMediaProps(data.image)?.src
        : undefined,
  };
};

const generateMeta = async <T extends CollectionSlug>(
  doc?: TypedCollection[T] | null,
  fallback?: Partial<Metadata>,
): Promise<Metadata> => {
  const siteConfig = await getSiteConfig();
  const seo = extractPageSeoData(doc && 'seo' in doc ? doc?.seo : undefined);

  const metadata: Metadata = {
    description: seo.description,
    openGraph: {
      description: seo.description,
      images: seo.image
        ? [
            {
              url: seo.image,
            },
          ]
        : undefined,
      title: seo.title,
      siteName: siteConfig.general.title,
    },
    title: seo.title,
  };

  return merge({}, fallback || {}, metadata);
};

export default generateMeta;
