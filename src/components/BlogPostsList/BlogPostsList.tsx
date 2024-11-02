import ListItem from '@/components/BlogPostsList/ListItem';
import { Post } from '@/payload/payload-types';

type BlogPostsListProps = {
  posts: Post[];
};

const BlogPostsList = ({ posts }: BlogPostsListProps) => {
  return (
    <div className="grid grid-cols-1 gap-5">
      {posts.map((post) => (
        <ListItem post={post} key={post.id} />
      ))}
    </div>
  );
};

export default BlogPostsList;
