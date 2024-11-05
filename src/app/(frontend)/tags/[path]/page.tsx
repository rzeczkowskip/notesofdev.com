import { notFound } from 'next/navigation';
import Blog from '@/app/(frontend)/blog/page';
import fetchDocumentByPath from '@/content/fetchDocumentByPath';

import generateStaticRoutingPaths from '@/content/generateStaticRoutingPaths';

type PageProps = {
  params: Promise<{
    path: string;
  }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const generateStaticParams = () => generateStaticRoutingPaths('tags');

const Page = async ({ params, searchParams }: PageProps) => {
  const { path = [] } = await params;
  const tag = await fetchDocumentByPath('tags', path);

  if (!tag) {
    return notFound();
  }

  return <Blog searchParams={searchParams} tag={tag} />;
};

export default Page;
