import { CachedPayload } from '@payload-enchants/cached-local-api';
import { getPayload as getPayloadClient, Payload } from 'payload';
import { cache } from 'react';
import { getCachedPayload } from '@/payload/cache';
import payloadConfig from '@payload-config';

export const getUncachedPayload = async (): Promise<Payload> => {
  return getPayloadClient({ config: payloadConfig });
};

export const getPayload = cache(
  async (): Promise<CachedPayload> =>
    getCachedPayload(await getUncachedPayload()),
);
