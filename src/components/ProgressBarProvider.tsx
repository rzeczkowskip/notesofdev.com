'use client';

import { AppProgressBar } from 'next-nprogress-bar';
import { PropsWithChildren } from 'react';

const ProgressBarProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      <AppProgressBar
        height="3px"
        color="var(--color-primary-9)"
        options={{ showSpinner: false }}
      />
    </>
  );
};

export default ProgressBarProvider;
