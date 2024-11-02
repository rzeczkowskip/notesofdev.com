import Link from 'next/link';
import Prose from '@/components/Prose';
import RichText from '@/components/RichText/RichText';
import { Post } from '@/payload/payload-types';
import getCollectionUrlPath from '@/utils/getCollectionUrlPath';

type ListItemProps = {
  post: Post;
};

const dateToYmdString = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth().toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const ListItem = ({ post }: ListItemProps) => {
  const postDate = new Date(post.publishedAt!);
  const formattedDate = new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
  }).format(postDate);

  return (
    <article className="grid grid-cols-1 gap-2 pb-5 border-b">
      <div>
        <time
          dateTime={dateToYmdString(postDate)}
          className="text-sm uppercase text-gray-11"
        >
          <span className="text-primary-11">&mdash;</span> {formattedDate}
        </time>
      </div>

      <h1 className="text-xl font-semibold">
        <Link
          href={getCollectionUrlPath('posts', post?.routing?.path)}
          className="hover:text-primary-11 group"
        >
          <span className="inline-block group-hover:translate-x-1 transition-transform">
            {post.title}
          </span>
        </Link>
      </h1>

      <div className="flex items-center">
        <Prose className="text-gray-11 grow" small>
          <RichText content={post.intro} />
        </Prose>
      </div>
    </article>
  );
};

export default ListItem;
