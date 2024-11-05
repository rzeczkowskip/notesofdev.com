import React, { PropsWithChildren } from 'react';
import cn from '@/utils/cn';

type PageWithSidebarProps = PropsWithChildren<{
  header?: React.ReactNode;
  sidebarItems?: React.ReactNode[];
}>;

const PageWithSidebar = ({
  header,
  children,
  sidebarItems,
}: PageWithSidebarProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-12 gap-x-8 py-24">
      {header && <div className="lg:col-span-2">{header}</div>}

      <main className={cn(header && 'row-start-2', 'lg:col-span-2')}>
        {children}
      </main>

      <aside
        className={cn(
          header && 'row-start-2',
          'grid grid-cols-1 gap-5 content-start',
        )}
      >
        {sidebarItems}
      </aside>
    </div>
  );
};

export default PageWithSidebar;
