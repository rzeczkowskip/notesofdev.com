import { Slot } from '@radix-ui/react-slot';
import React, { PropsWithChildren } from 'react';
import cn from '@/utils/cn';

type ProseProps = PropsWithChildren<{
  asChild?: boolean;
  className?: string;
  small?: boolean;
}>;

const Prose = React.forwardRef<HTMLDivElement, ProseProps>(function Prose(
  { asChild, className, small, ...props },
  ref,
) {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      className={cn('prose', small !== true && 'md:prose-lg', className)}
      {...props}
      ref={ref}
    />
  );
});

export default Prose;
