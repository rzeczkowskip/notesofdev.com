import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';
import PageWithSidebar from '@/app/(frontend)/_pageLayout/PageWithSidebar';
import Container from '@/components/Container';
import PageTitle from '@/components/PageTitle';
import Prose from '@/components/Prose';
import RichText from '@/components/RichText/RichText';
import fetchDocumentByPath from '@/content/fetchDocumentByPath';
import generateMeta from '@/content/generateMeta';

type PageProps = {
  params: Promise<{
    path?: string[];
  }>;
  beforeContent?: React.ReactNode;
  afterContent?: React.ReactNode;
  pageTitle?: string;
  customPage?: boolean;
};

const getPage = async (params: PageProps['params']) => {
  return fetchDocumentByPath('pages', (await params).path || []);
};

const Page = async ({
  params,
  beforeContent,
  afterContent,
  pageTitle,
  customPage,
}: PageProps) => {
  const page = await getPage(params);

  if (!customPage && !page) {
    return notFound();
  }

  const title = page?.showTitle === false ? null : page?.title || pageTitle;

  return (
    <Container>
      <PageWithSidebar>
        {title && <PageTitle>{title}</PageTitle>}

        <div className="grid grid-cols-1 gap-8">
          {beforeContent}

          {page && (
            <Prose>
              <RichText content={page.content} />
            </Prose>
          )}

          {afterContent}
        </div>
      </PageWithSidebar>
    </Container>
  );
};

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> =>
  generateMeta('pages', await getPage(params));

export default Page;
