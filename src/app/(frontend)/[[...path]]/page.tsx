import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import FullPage from '@/app/(frontend)/_pageLayout/FullPage';
import PageWithSidebar from '@/app/(frontend)/_pageLayout/PageWithSidebar';
import BlogPostsList from '@/components/BlogPostsList/BlogPostsList';
import Container from '@/components/Container';
import CtaLink from '@/components/CtaLink/CtaLink';
import PageTitle from '@/components/PageTitle';
import Prose from '@/components/Prose';
import RichText from '@/components/RichText/RichText';
import Section from '@/components/Section';
import fetchBlogPosts from '@/content/fetchBlogPosts';
import fetchDocumentByPath from '@/content/fetchDocumentByPath';
import generateMeta from '@/content/generateMeta';
import generateStaticRoutingPaths from '@/content/generateStaticRoutingPaths';
import getCollectionUrlPath from '@/utils/getCollectionUrlPath';

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
    <Container>
      <PageWithSidebar pageTitle={page.showTitle && page.title}>
        {page.showTitle && <PageTitle>{page.title}</PageTitle>}

        <Prose>
          <RichText content={page.content} />
        </Prose>
      </PageWithSidebar>
    </Container>
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
