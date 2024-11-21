import { CachedPayload } from '@payload-enchants/cached-local-api';
import { getPayload as getPayloadClient, Payload } from 'payload';
import { getCachedPayload } from '@/payload/cache';
import { Admin } from '@/payload/payload-types';
import payloadConfig from '@payload-config';

export const getUncachedPayload = async (): Promise<Payload> => {
  return getPayloadClient({ config: payloadConfig });
};

export const getPayload = async (): Promise<CachedPayload> => {
  return getCachedPayload(await getUncachedPayload());
};
