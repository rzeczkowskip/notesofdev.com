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
  const page = await fetchDocumentByPath('tags', path);

  if (!page) {
    return notFound();
  }

  return (
    <>
      <h1 className="text-5xl">#{page.title}</h1>

      <Blog searchParams={searchParams} tagId={page.id} />
    </>
  );
};

export default Page;
