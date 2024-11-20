import BlogPostsList from '@/components/BlogPostsList/BlogPostsList';
import Pagination from '@/components/Pagination';
import Prose from '@/components/Prose';
import Section from '@/components/Section';
import { STATIC_ROUTES } from '@/contants';
import fetchBlogPosts from '@/content/fetchBlogPosts';
import type { Tag } from '@/payload/payload-types';

type BlogLatestPostsProps = {
  postCount?: number;
  page?: number;
  tags?: (string | Tag)[];
};

const BlogLatestPosts = async ({
  postCount = 5,
  page = 1,
  tags,
}: BlogLatestPostsProps) => {
  const posts = await fetchBlogPosts({
    limit: postCount,
    page: page,
    tags,
  });

  if (!posts.docs) {
    return <Prose>No posts found.</Prose>;
  }

  const { hasNextPage, hasPrevPage } = posts;

  return (
    <Section>
      <BlogPostsList posts={posts.docs} />

      <Pagination
        className="mt-10"
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        nextPageLabel={'Older posts'}
        prevPageLabel={'Newer posts'}
        page={page}
        generatePageHref={(p) => `/${STATIC_ROUTES.Blog}/?page=${p}`}
      />
    </Section>
  );
};

export default BlogLatestPosts;
