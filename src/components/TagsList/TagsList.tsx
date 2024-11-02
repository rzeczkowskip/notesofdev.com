import Link from 'next/link';
import { Tag } from '@/payload/payload-types';
import cn from '@/utils/cn';
import getCollectionUrlPath from '@/utils/getCollectionUrlPath';

type TagsListProps = {
  tags: Tag[];
  linkClassName?: string;
  className?: string;
};

const TagsList = ({ tags, className, linkClassName }: TagsListProps) => {
  if (!tags.length) {
    return null;
  }

  return (
    <ul className={cn('list-none flex flex-wrap gap-2', className)}>
      {tags.map((tag) => {
        return (
          <li key={tag.id}>
            <Link
              href={getCollectionUrlPath('tags', tag.routing?.path)}
              className={cn('hover:underline', linkClassName)}
            >
              #{tag.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default TagsList;
