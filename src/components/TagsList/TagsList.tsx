import Link from 'next/link';
import CtaLink from '@/components/CtaLink/CtaLink';
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
            <CtaLink
              href={getCollectionUrlPath('tags', tag.routing?.path)}
              className="block border-gray-6"
            >
              {tag.title}
            </CtaLink>
          </li>
        );
      })}
    </ul>
  );
};

export default TagsList;
