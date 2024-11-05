import React, { PropsWithChildren } from 'react';

type FullPageProps = PropsWithChildren;

const FullPage = ({ children }: FullPageProps) => {
  return <main>{children}</main>;
};

export default FullPage;
