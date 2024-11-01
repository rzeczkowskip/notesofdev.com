import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Prose from '@/components/Prose';
import RichText from '@/components/RichText/RichText';
import fetchDocumentByPath from '@/content/fetchDocumentByPath';

import generateMeta from '@/content/generateMeta';
import generateStaticRoutingPaths from '@/content/generateStaticRoutingPaths';

type PageProps = {
  params: Promise<{
    path: string;
  }>;
};

const getPost = async (params: PageProps['params']) => {
  return fetchDocumentByPath('posts', (await params).path);
};

const Page = async ({ params }: PageProps) => {
  const post = await getPost(params);

  if (!post) {
    return notFound();
  }

  return (
    <>
      <h1 className="text-5xl">{post.title}</h1>
      <Prose>
        <RichText content={post.content} />
      </Prose>
    </>
  );
};

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> =>
  generateMeta('posts', await getPost(params));

export const generateStaticParams = () => generateStaticRoutingPaths('posts');

export default Page;
