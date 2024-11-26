import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Blog from '@/app/(frontend)/blog/page';
import fetchDocumentByPath from '@/content/fetchDocumentByPath';

import generateMeta from '@/content/generateMeta';

type PageProps = {
  params: Promise<{
    path: string;
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const getTag = async (params: PageProps['params']) => {
  return fetchDocumentByPath('tags', (await params).path);
};

const Page = async ({ params, searchParams }: PageProps) => {
  const tag = await getTag(params);

  if (!tag) {
    return notFound();
  }

  return <Blog searchParams={searchParams} tag={tag} />;
};

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => generateMeta(await getTag(params));

export default Page;
