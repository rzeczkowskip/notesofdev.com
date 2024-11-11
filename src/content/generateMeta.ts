import { Metadata } from 'next';
import { CollectionSlug, TypedCollection } from 'payload';
import { getPayload } from '@/payload/client';

const generateMeta = async <T extends CollectionSlug>(
  contentType: T,
  doc?: TypedCollection[T] | null,
): Promise<Metadata> => {
  const seo = doc && 'seo' in doc ? doc.seo : {};
  const siteConfig = await (
    await getPayload()
  ).findGlobal({ slug: 'siteConfig' });

  const ogImage = typeof seo?.image === 'object' ? seo?.image?.url : undefined;
  const title = seo?.title
    ? `${seo.title} | ${siteConfig.general.title}`
    : siteConfig.general.title;
  const description = seo?.description || undefined;

  return {
    description,
    openGraph: {
      description,
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url:
        doc && 'routing' in doc && !!doc.routing.path
          ? doc.routing.path
          : undefined,
    },
    title,
  };
};

export default generateMeta;
