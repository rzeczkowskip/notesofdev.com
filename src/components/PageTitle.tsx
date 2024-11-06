import { PropsWithChildren } from 'react';
import cn from '@/utils/cn';

type PageTitleProps = PropsWithChildren<{
  className?: string;
}>;

const PageTitle = ({ children, className }: PageTitleProps) => {
  if (!children) {
    return null;
  }

  return (
    <h1 className={cn('text-5xl font-semibold leading-none mb-8', className)}>
      {children}
    </h1>
  );
};

export default PageTitle;
