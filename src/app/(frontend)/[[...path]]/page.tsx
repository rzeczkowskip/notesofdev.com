import { getGlobal } from 'bson/src/utils/global';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Prose from '@/components/Prose';
import RichText from '@/components/RichText/RichText';
import fetchDocumentByPath from '@/content/fetchDocumentByPath';
import generateMeta from '@/content/generateMeta';
import generateStaticRoutingPaths from '@/content/generateStaticRoutingPaths';

type PageProps = {
  params: Promise<{
    path?: string[];
  }>;
};

const getPage = async (params: PageProps['params']) => {
  return fetchDocumentByPath('pages', (await params).path || []);
};

const Page = async ({ params }: PageProps) => {
  const page = await getPage(params);

  if (!page) {
    return notFound();
  }

  return (
    <>
      {page.showTitle && <h1 className="text-5xl">{page.title}</h1>}
      <Prose>
        <RichText content={page.content} />
      </Prose>
    </>
  );
};

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> =>
  generateMeta('pages', await getPage(params));

export const generateStaticParams = () =>
  generateStaticRoutingPaths('pages', {
    pathAsArray: true,
  });

export default Page;
