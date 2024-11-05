import React, { PropsWithChildren } from 'react';
import cn from '@/utils/cn';

type PageWithSidebarProps = PropsWithChildren<{
  header?: React.ReactNode;
  sidebarItems?: React.ReactNode[];
  className?: string;
}>;

const PageWithSidebar = ({
  header,
  children,
  sidebarItems,
  className,
}: PageWithSidebarProps) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 lg:grid-cols-3 gap-y-12 gap-x-8',
        className,
      )}
    >
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
