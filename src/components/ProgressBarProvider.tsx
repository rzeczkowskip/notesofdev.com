'use client';

import { AppProgressBar } from 'next-nprogress-bar';
import { PropsWithChildren } from 'react';

const ProgressBarProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      <AppProgressBar
        color="var(--color-primary-8)"
        options={{ showSpinner: false }}
      />
    </>
  );
};

export default ProgressBarProvider;
