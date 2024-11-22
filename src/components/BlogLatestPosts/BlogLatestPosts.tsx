import BlogPostsList from '@/components/BlogPostsList/BlogPostsList';
import Prose from '@/components/Prose';
import Section from '@/components/Section';
import fetchBlogPosts from '@/content/fetchBlogPosts';
import type { Tag } from '@/payload/payload-types';

type BlogLatestPostsProps = {
  postCount?: number;
  tags?: (string | Tag)[];
};

const BlogLatestPosts = async ({
  postCount = 5,
  tags,
}: BlogLatestPostsProps) => {
  const posts = await fetchBlogPosts({
    limit: postCount,
    tags,
  });

  if (!posts.docs) {
    return <Prose>No posts found.</Prose>;
  }

  return (
    <Section>
      <BlogPostsList posts={posts.docs} />
    </Section>
  );
};

export default BlogLatestPosts;
