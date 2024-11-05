import { PaginatedDocs } from 'payload';
import { getPayload } from '@/payload/client';
import { Post, Tag } from '@/payload/payload-types';

type FetchPostsOptions = {
  limit?: number;
  page?: number;
  tags?: (string | Tag)[];
  ignoredPosts?: (string | Post)[];
};

const contentToId = (item: string | Tag | Post) => {
  return typeof item === 'string' ? item : item.id;
};

const fetchBlogPosts = async (
  options: FetchPostsOptions,
): Promise<PaginatedDocs<Post>> => {
  const client = await getPayload();

  const limit = options.limit && options.limit >= 0 ? options.limit : 10;
  const page = options.page && options.page > 0 ? options.page : 1;

  const tagIds = (options.tags || []).map(contentToId);
  const ignoredPosts = (options.ignoredPosts || []).map(contentToId);

  const where = [];

  if (tagIds.length > 0) {
    where.push({
      tags: {
        in: tagIds,
      },
    });
  }

  if (ignoredPosts.length > 0) {
    where.push({
      id: {
        not_in: ignoredPosts,
      },
    });
  }

  return client.find({
    collection: 'posts',
    sort: '-publishedAt',
    limit,
    page,
    where: {
      and: where,
    },
  });
};

export default fetchBlogPosts;
