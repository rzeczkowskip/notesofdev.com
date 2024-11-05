import { notFound } from 'next/navigation';
import BlogPostsList from '@/components/BlogPostsList/BlogPostsList';
import Card from '@/components/Card';
import Container from '@/components/Container';
import PageWithSidebar from '@/components/PageTemplate/PageWithSidebar';
import PageTitle from '@/components/PageTitle';
import Pagination from '@/components/Pagination';
import Section from '@/components/Section';
import SidebarTags from '@/components/Sidebar/SidebarTags';
import fetchDocumentByPath from '@/content/fetchDocumentByPath';
import { getPayload } from '@/payload/client';
import getCollectionUrlPath from '@/utils/getCollectionUrlPath';

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
  tagId?: string;
};

const parsePageNumber = (value: unknown): number => {
  if (typeof value !== 'string') {
    return 1;
  }

  const asInt = Number.parseInt(value);

  if (Number.isNaN(asInt) || asInt < 1) {
    return 1;
  }

  return asInt;
};

const Page = async ({ searchParams, tagId }: PageProps) => {
  const params = await searchParams;
  const pageNumber = parsePageNumber(params.page);

  const where = tagId
    ? {
        tags: {
          in: [tagId],
        },
      }
    : undefined;

  const client = await getPayload();
  const {
    totalPages,
    hasNextPage,
    hasPrevPage,
    docs: posts,
  } = await client.find({
    collection: 'posts',
    sort: '-publishedAt',
    limit: 1,
    page: pageNumber,
    where,
  });

  if (pageNumber && totalPages < pageNumber) {
    return notFound();
  }

  const tags = await client.find({
    collection: 'tags',
    sort: '-updatedAt',
    depth: 0,
  });

  const page = await fetchDocumentByPath('pages', '/blog');

  return (
    <Container>
      <PageWithSidebar
        header={
          (!page || page?.showTitle) && (
            <PageTitle title={page?.title || 'Blog'} />
          )
        }
        sidebarItems={[<SidebarTags tags={tags.docs} key="tags" />]}
      >
        <div className="grid grid-cols-1 gap-16">
          {posts && (
            <Section title="Latest posts">
              <BlogPostsList posts={posts} />

              <Pagination
                className="mt-10"
                hasNextPage={hasNextPage}
                hasPrevPage={hasPrevPage}
                nextPageLabel={'Older posts'}
                prevPageLabel={'Newer posts'}
                page={pageNumber}
                generatePageHref={(p) =>
                  `${getCollectionUrlPath('posts')}?page=${p}`
                }
              />
            </Section>
          )}
        </div>
      </PageWithSidebar>
    </Container>
  );
};

export default Page;
