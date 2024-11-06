import { notFound } from 'next/navigation';
import PageWithSidebar from '@/app/(frontend)/_pageLayout/PageWithSidebar';
import BlogPostsList from '@/components/BlogPostsList/BlogPostsList';
import Container from '@/components/Container';
import PageTitle from '@/components/PageTitle';
import Pagination from '@/components/Pagination';
import Section from '@/components/Section';
import fetchDocumentByPath from '@/content/fetchDocumentByPath';
import { getPayload } from '@/payload/client';
import { Tag } from '@/payload/payload-types';
import getCollectionUrlPath from '@/utils/getCollectionUrlPath';

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
  tag?: Tag;
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

const Page = async ({ searchParams, tag }: PageProps) => {
  const params = await searchParams;
  const pageNumber = parsePageNumber(params.page);

  const where = tag
    ? {
        tags: {
          in: [tag.id],
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
    limit: 20,
    page: pageNumber,
    where,
  });

  if (pageNumber && totalPages < pageNumber) {
    return notFound();
  }

  const page = tag ? null : await fetchDocumentByPath('pages', '/blog');

  return (
    <Container>
      <PageWithSidebar>
        {page?.showTitle !== false && (
          <PageTitle>
            {page?.title || (tag ? `#${tag.title}` : 'Blog')}
          </PageTitle>
        )}
        <div className="grid grid-cols-1 gap-16">
          {posts && (
            <Section title="Posts">
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
