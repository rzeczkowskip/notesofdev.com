import { PropsWithChildren } from 'react';
import cn from '@/utils/cn';

type SectionProps = PropsWithChildren<{
  title?: string;
  className?: string;
  noBorder?: boolean;
}>;

const Section = ({ title, children, noBorder, className }: SectionProps) => {
  const hasBorder = noBorder !== true;

  return (
    <section className={cn(hasBorder && 'border-b pb-5', className)}>
      {title && <h1 className="font-semibold text-xl mb-5">{title}</h1>}

      {children}
    </section>
  );
};

export default Section;
