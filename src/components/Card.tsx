import React, { PropsWithChildren } from 'react';
import cn from '@/utils/cn';

type SectionProps = PropsWithChildren<{
  title?: React.ReactNode;
  className?: string;
  titleClassName?: string;
}>;

const Card = ({ title, children, className, titleClassName }: SectionProps) => {
  return (
    <section className={cn('border p-5', className)}>
      {title && (
        <h1 className={cn('font-bold text-xl mb-5', titleClassName)}>
          {title}
        </h1>
      )}

      {children}
    </section>
  );
};

export default Card;
