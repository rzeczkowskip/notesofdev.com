import { PropsWithChildren } from 'react';

type SectionProps = PropsWithChildren<{
  title?: string;
  className?: string;
}>;

const Section = ({ title, children, className }: SectionProps) => {
  return (
    <section className={className}>
      {title && <h1 className="font-bold text-xl mb-5">{title}</h1>}

      {children}
    </section>
  );
};

export default Section;
