import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import CtaLink from '@/components/CtaLink/CtaLink';
import cn from '@/utils/cn';

type PaginationProps = {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  page: number;
  nextPageLabel?: string;
  prevPageLabel?: string;
  className?: string;
  generatePageHref: (page: number) => string;
};

const Pagination = ({
  hasPrevPage,
  hasNextPage,
  page,
  nextPageLabel,
  prevPageLabel,
  className,
  generatePageHref,
}: PaginationProps) => {
  if (!hasNextPage && !hasPrevPage) {
    return null;
  }

  return (
    <div className={cn('flex', className)}>
      {hasPrevPage && (
        <CtaLink
          href={generatePageHref(page - 1)}
          icon={<ArrowLeftIcon className="h-4 w-4" />}
          iconPosition="start"
          iconClassName="transition group-hover:-translate-x-1"
        >
          {prevPageLabel || 'Previous page'}
        </CtaLink>
      )}

      {hasNextPage && (
        <CtaLink
          href={generatePageHref(page + 1)}
          icon={<ArrowRightIcon className="h-4 w-4" />}
          iconPosition="end"
          className="ml-auto mr-0"
          iconClassName="transition group-hover:translate-x-1"
        >
          {nextPageLabel || 'Next page'}
        </CtaLink>
      )}
    </div>
  );
};

export default Pagination;
