import cn from '@/utils/cn';

type PageTitleProps = {
  title?: string;
  className?: string;
};

const PageTitle = ({ title, className }: PageTitleProps) => {
  if (!title) {
    return null;
  }

  return (
    <h1 className={cn('text-5xl font-semibold leading-none', className)}>
      {title}
    </h1>
  );
};

export default PageTitle;
