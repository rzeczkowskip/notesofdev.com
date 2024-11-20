import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { notFound } from 'next/navigation';
import { PaginatedDocs } from 'payload';
import Page from '@/app/(frontend)/[[...path]]/page';
import BlogLatestPosts from '@/components/BlogLatestPosts/BlogLatestPosts';
import CtaLink from '@/components/CtaLink/CtaLink';
import Section from '@/components/Section';
import TagsList from '@/components/TagsList/TagsList';
import { STATIC_ROUTES } from '@/contants';
import { getPayload } from '@/payload/client';
import { Tag } from '@/payload/payload-types';

export const dynamic = 'force-dynamic';

const TagsPage = async () => {
  const client = await getPayload();
  // @ts-expect-error cache plugin issue
  const { docs } = (await client.find({
    collection: 'tags',
    sort: 'title',
    limit: -1,
  })) as PaginatedDocs<Tag>;

  if (docs.length === 0) {
    return notFound();
  }

  return (
    <Page
      customPage
      params={Promise.resolve({ path: [STATIC_ROUTES.Tags] })}
      pageTitle={'Tags'}
      beforeContent={<TagsList tags={docs} />}
      afterContent={
        <Section title="Latest posts" className="pt-8 border-t">
          <BlogLatestPosts />

          <div className="text-right mt-10">
            <CtaLink
              href={STATIC_ROUTES.Blog}
              icon={<ArrowRightIcon className="h-4 w-4" />}
              iconPosition="end"
            >
              View all posts
            </CtaLink>
          </div>
        </Section>
      }
    />
  );
};

export default TagsPage;
