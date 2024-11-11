import BlogPostsList from '@/components/BlogPostsList/BlogPostsList';
import fetchBlogPosts from '@/content/fetchBlogPosts';

type BlogLatestPostsProps = {
  postCount?: number;
};

const BlogLatestPosts = async ({ postCount = 5 }: BlogLatestPostsProps) => {
  const posts = await fetchBlogPosts({
    limit: postCount,
  });

  if (!posts.docs) {
    return null;
  }

  return <BlogPostsList posts={posts.docs} />;
};

export default BlogLatestPosts;
