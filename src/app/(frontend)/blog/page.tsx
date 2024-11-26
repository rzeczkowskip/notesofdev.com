import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Page from '@/app/(frontend)/[[...path]]/page';
import BlogPostsList from '@/components/BlogPostsList/BlogPostsList';
import Pagination from '@/components/Pagination';
import Section from '@/components/Section';
import { STATIC_ROUTES } from '@/contants';
import fetchBlogPosts from '@/content/fetchBlogPosts';
import fetchDocumentByPath from '@/content/fetchDocumentByPath';
import generateMeta from '@/content/generateMeta';
import { Tag } from '@/payload/payload-types';

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
  const {
    totalPages,
    hasNextPage,
    hasPrevPage,
    docs: posts,
  } = await fetchBlogPosts({
    limit: 20,
    page: pageNumber,
    tags: tag ? [tag] : undefined,
  });

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
                generatePageHref={(p) => `${STATIC_ROUTES.Blog}/?page=${p}`}
              />
            </Section>
          </div>
        )
      }
    />
  );
};

export const generateMetadata = async (): Promise<Metadata> => {
  return generateMeta(await fetchDocumentByPath('pages', STATIC_ROUTES.Blog), {
    title: 'Blog',
  });
};

export default Blog;
