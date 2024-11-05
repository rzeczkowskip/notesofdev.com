import { PropsWithChildren } from 'react';
import cn from '@/utils/cn';

type SectionProps = PropsWithChildren<{
  title?: string;
  className?: string;
}>;

const Card = ({ title, children, className }: SectionProps) => {
  return (
    <section className={cn('border p-5 rounded-lg', className)}>
      {title && <h1 className="font-semibold text-xl mb-5">{title}</h1>}

      {children}
    </section>
  );
};

export default Card;
