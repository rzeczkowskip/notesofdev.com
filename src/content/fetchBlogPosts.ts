import { PaginatedDocs } from 'payload';
import { getPayload } from '@/payload/client';
import { Post, Tag } from '@/payload/payload-types';

type FetchPostsOptions = {
  limit?: number;
  page?: number;
  tag?: string | Tag;
};

const fetchBlogPosts = async (
  options: FetchPostsOptions,
): Promise<PaginatedDocs<Post>> => {
  const client = await getPayload();

  const limit = options.limit && options.limit >= 0 ? options.limit : 10;
  const page = options.page && options.page > 0 ? options.page : 1;

  const tagId =
    typeof options.tag === 'string' ? options.tag : options?.tag?.id;

  const where = tagId
    ? {
        tags: {
          in: [tagId],
        },
      }
    : undefined;

  return client.find({
    collection: 'posts',
    sort: '-publishedAt',
    limit,
    page,
    where,
  });
};

export default fetchBlogPosts;
