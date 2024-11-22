import Image from 'next/image';
import Link from 'next/link';
import MediaImage from '@/components/MediaImage';
import Prose from '@/components/Prose';
import RichText from '@/components/RichText/RichText';
import Time from '@/components/Time';
import { Post } from '@/payload/payload-types';
import cn from '@/utils/cn';

type ListItemProps = {
  post: Post;
};

const ListItem = ({ post }: ListItemProps) => {
  const poster =
    post.poster && typeof post.poster === 'object' ? post.poster : null;

  return (
    <article className="grid grid-cols-1 gap-2 pb-5 border-b border-gray-7">
      <span className="text-sm uppercase text-gray-11 block">
        <span className="text-primary-11">&mdash;</span>&nbsp;
        <Time date={post.publishedAt!} />
      </span>

      <Link className="flex flex-nowrap gap-5 group" href={post.routing.path}>
        <div className="grid grid-cols-1 gap-2 grow">
          <h1 className="text-xl font-semibold group-hover:text-primary-11">
            <span className="inline-block group-hover:translate-x-1 transition-transform">
              {post.title}
            </span>
          </h1>

          <div className="flex items-center">
            <Prose className="text-gray-11 grow" small>
              <RichText content={post.intro} />
            </Prose>
          </div>
        </div>

        <div className={cn('w-32 shrink-0 grow-0', poster ? 'h-32' : 'h-0')}>
          {poster && <MediaImage alt="" media={poster} mediaSize="thumbnail" />}
        </div>
      </Link>
    </article>
  );
};

export default ListItem;
