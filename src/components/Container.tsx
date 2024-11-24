import { Slot } from '@radix-ui/react-slot';
import React, { PropsWithChildren } from 'react';
import cn from '@/utils/cn';

type ContainerProps = PropsWithChildren<{
  asChild?: boolean;
  className?: string;
  size?: 'full' | 'prose' | 'breakpoint';
}>;

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  function Container(
    { asChild, size = 'breakpoint', className, ...props },
    ref,
  ) {
    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
        className={cn(
          size === 'breakpoint' && 'container',
          size === 'prose' && 'prose-container',
          'mx-auto px-4',
          className,
        )}
        {...props}
        ref={ref}
      />
    );
  },
);

export default Container;
