import React, { PropsWithChildren } from 'react';
import Section from '@/components/Section';
import TagsList from '@/components/TagsList/TagsList';
import { getPayload } from '@/payload/client';
import cn from '@/utils/cn';

type PageWithSidebarProps = PropsWithChildren<{
  pageTitle?: React.ReactNode;
  className?: string;
}>;

const PageWithSidebar = async ({
  children,
  className,
}: PageWithSidebarProps) => {
  const client = await getPayload();
  const tags = await client.find({
    collection: 'tags',
    sort: 'title',
    depth: 0,
  });

  return (
    <div
      className={cn('grid grid-cols-1 lg:grid-cols-3 gap-x-8 py-12', className)}
    >
      <main className={cn('lg:col-span-2')}>{children}</main>

      <aside className={cn('grid grid-cols-1 gap-5 content-start')}>
        {tags.docs.length > 0 && (
          <Section title="Discover more" className="border-b pb-5">
            <TagsList tags={tags.docs} className="text-sm" />
          </Section>
        )}
      </aside>
    </div>
  );
};

export default PageWithSidebar;
