import React, { PropsWithChildren } from 'react';

type FullPageProps = PropsWithChildren<{
  className?: string;
}>;

const FullPage = ({ children, className }: FullPageProps) => {
  return <main className={className}>{children}</main>;
};

export default FullPage;
