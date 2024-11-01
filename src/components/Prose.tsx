import { Slot } from '@radix-ui/react-slot';
import React, { PropsWithChildren } from 'react';
import cn from '@/utils/cn';

type ProseProps = PropsWithChildren<{
  asChild?: boolean;
  className?: string;
}>;

const Prose = React.forwardRef<HTMLDivElement, ProseProps>(function Prose(
  { asChild, className, ...props },
  ref,
) {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp className={cn('prose md:prose-lg', className)} {...props} ref={ref} />
  );
});

export default Prose;
