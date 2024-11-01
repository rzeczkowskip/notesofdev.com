import Link from 'next/link';
import { notFound } from 'next/navigation';
import InternalLink from '@/components/ContentLink/InternalLink';
import Prose from '@/components/Prose';
import { getPayload } from '@/payload/client';

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
  const page = parsePageNumber(params.page);

  const where = tagId
    ? {
        tags: {
          in: [tagId],
        },
      }
    : undefined;

  const client = await getPayload();
  const { docs, totalPages, hasNextPage, hasPrevPage } = await client.find({
    collection: 'posts',
    sort: '-publishedAt',
    limit: 10,
    page,
    where,
  });

  if (page && totalPages < page) {
    return notFound();
  }

  if (docs.length === 0) {
    return <Prose>No posts</Prose>;
  }

  return (
    <>
      <Prose>
        <ul>
          {docs.map((post) => (
            <li key={post.id}>
              <div>
                <InternalLink collection="posts" path={post?.routing?.path}>
                  {post.title}
                </InternalLink>
              </div>
              {post.publishedAt && (
                <small>
                  {new Date(post.publishedAt || 'now').toDateString()}
                </small>
              )}
            </li>
          ))}
        </ul>
      </Prose>

      {(hasNextPage || hasPrevPage) && (
        <div className="mt-8 flex">
          {hasPrevPage && (
            <Link href={`?page=${page - 1}`} className="ml-0">
              ← Newer posts
            </Link>
          )}
          {hasNextPage && (
            <Link href={`?page=${page + 1}`} className="ml-auto mr-0">
              Older posts →
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default Page;
