import { getPayload } from '@/payload/client';

const getSiteConfig = async () => {
  const client = await getPayload();

  // @ts-expect-error cache plugin issue
  return client.findGlobal({
    slug: 'siteConfig',
  });
};

export default getSiteConfig;
