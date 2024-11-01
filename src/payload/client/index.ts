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

export async function getCurrentAdmin(): Promise<Admin | null> {
  const payload = await getUncachedPayload();
  return (await payload.auth({ headers: await headers() })).user;
}

export const generatePayloadQueryDefaults = async (): Promise<
  Partial<Parameters<Payload['find']>[0] & Parameters<Payload['findGlobal']>[0]>
> => {
  const { isEnabled: isDraftMode } = await draftMode();
  const currentUser = isDraftMode ? await getCurrentAdmin() : undefined;

  return {
    draft: isDraftMode,
    user: currentUser || undefined,
    overrideAccess: false,
  };
};
