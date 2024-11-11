import { ArrowRightIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import FullPage from '@/app/(frontend)/_pageLayout/FullPage';
import BlogLatestPosts from '@/components/BlogLatestPosts/BlogLatestPosts';
import Card from '@/components/Card';
import Container from '@/components/Container';
import CtaLink from '@/components/CtaLink/CtaLink';
import PageTitle from '@/components/PageTitle';
import Prose from '@/components/Prose';
import { STATIC_ROUTES } from '@/contants';
import { getPayload } from '@/payload/client';

const Page = async () => {
  const client = await getPayload();
  const { docs } = await client.find({
    collection: 'tags',
    sort: 'title',
    limit: -1,
  });

  if (docs.length === 0) {
    return notFound();
  }

  return (
    <FullPage>
      <Container size="prose" className="mb-24">
        <PageTitle>Tags</PageTitle>
        <Prose className="prose-ul:ps-0 prose-li:ps-0 prose-li:m-0">
          {docs.length ? (
            <ul className="flex gap-2 list-none">
              {docs.map((post) => (
                <li key={post.id}>
                  <Link href={post.routing.path}>#{post.title}</Link>
                </li>
              ))}
            </ul>
          ) : (
            'No tags'
          )}
        </Prose>
      </Container>

      <div className="bg-gray-1 border-t py-24">
        <Container size="prose">
          <Card title="Latest posts" className="bg-solid">
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
          </Card>
        </Container>
      </div>
    </FullPage>
  );
};

export default Page;
