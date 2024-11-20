import { notFound } from 'next/navigation';
import { PaginatedDocs } from 'payload';
import Page from '@/app/(frontend)/[[...path]]/page';
import BlogPostsList from '@/components/BlogPostsList/BlogPostsList';
import Pagination from '@/components/Pagination';
import Section from '@/components/Section';
import { STATIC_ROUTES } from '@/contants';
import { getPayload } from '@/payload/client';
import { Post, Tag } from '@/payload/payload-types';

export const dynamic = 'force-dynamic';

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

const Blog = async ({ searchParams, tag }: PageProps) => {
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
    // @ts-expect-error cache plugin issue
  } = (await client.find({
    collection: 'posts',
    sort: '-publishedAt',
    limit: 20,
    page: pageNumber,
    where,
  })) as PaginatedDocs<Post>;

  if (pageNumber && totalPages < pageNumber) {
    return notFound();
  }

  return (
    <Page
      customPage
      params={Promise.resolve({ path: [STATIC_ROUTES.Blog] })}
      pageTitle={tag ? `#${tag.title}` : 'Blog'}
      beforeContent={
        posts && (
          <div className="grid grid-cols-1 gap-16">
            <Section>
              <BlogPostsList posts={posts} />

              <Pagination
                className="mt-10"
                hasNextPage={hasNextPage}
                hasPrevPage={hasPrevPage}
                nextPageLabel={'Older posts'}
                prevPageLabel={'Newer posts'}
                page={pageNumber}
                generatePageHref={(p) => `/${STATIC_ROUTES.Blog}/?page=${p}`}
              />
            </Section>
          </div>
        )
      }
    />
  );
};

export default Blog;
