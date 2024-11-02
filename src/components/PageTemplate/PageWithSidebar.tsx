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
    <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 gap-x-8 py-24">
      {header && <div className="md:col-span-3">{header}</div>}
      <main className={cn(header && 'row-start-2', 'md:col-span-3')}>
        {children}
      </main>
      <aside
        className={cn(
          header && 'row-start-2',
          'grid grid-cols-1 gap-5 content-start',
        )}
      >
        {sidebarItems?.map((item, i) => {
          return (
            <div key={i} className="border border-gray-6 p-5 rounded-lg">
              {item}
            </div>
          );
        })}
      </aside>
    </div>
  );
};

export default PageWithSidebar;
