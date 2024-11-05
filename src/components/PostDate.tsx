import Time from '@/components/Time';
import cn from '@/utils/cn';

type PostDateProps = {
  publishedAt?: string | Date | null;
  className?: string;
};

const PostDate = ({ publishedAt, className }: PostDateProps) => {
  if (!publishedAt) {
    return null;
  }

  return (
    <div className={cn('text-sm uppercase text-gray-11', className)}>
      <span className="text-primary-11">&mdash;</span>&nbsp;
      <Time date={publishedAt} />
    </div>
  );
};

export default PostDate;
