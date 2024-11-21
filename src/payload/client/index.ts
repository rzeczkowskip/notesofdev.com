import { CachedPayload } from '@payload-enchants/cached-local-api';
import { getPayloadHMR } from '@payloadcms/next/utilities';
import { draftMode, headers } from 'next/headers';
import type { Payload } from 'payload';
import { getCachedPayload } from '@/payload/cache';
import { Admin } from '@/payload/payload-types';
import payloadConfig from '@payload-config';

export const getUncachedPayload = async (): Promise<Payload> => {
  return getPayloadHMR({ config: payloadConfig });
};

export const getPayload = async (): Promise<CachedPayload> => {
  return getCachedPayload(await getUncachedPayload());
};
