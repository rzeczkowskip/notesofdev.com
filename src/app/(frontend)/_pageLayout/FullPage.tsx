import React, { PropsWithChildren } from 'react';
import cn from '@/utils/cn';

type FullPageProps = PropsWithChildren<{
  className?: string;
}>;

const FullPage = ({ children, className }: FullPageProps) => {
  return <main className={cn('py-12', className)}>{children}</main>;
};

export default FullPage;
