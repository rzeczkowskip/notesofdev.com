import { ArrowRightIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BlogPostsList from '@/components/BlogPostsList/BlogPostsList';
import Card from '@/components/Card';
import Container from '@/components/Container';
import CtaLink from '@/components/CtaLink/CtaLink';
import FullPage from '@/components/PageTemplate/FullPage';
import PageTitle from '@/components/PageTitle';
import Prose from '@/components/Prose';
import Section from '@/components/Section';
import fetchBlogPosts from '@/content/fetchBlogPosts';
import { getPayload } from '@/payload/client';
import getCollectionUrlPath from '@/utils/getCollectionUrlPath';

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

  const posts = await fetchBlogPosts({
    limit: 5,
  });

  return (
    <FullPage className="pt-24">
      <Container size="prose" className="mb-24">
        <PageTitle title="Tags" className="mb-12" />
        <Prose className="prose-ul:ps-0 prose-li:ps-0 prose-li:m-0">
          {docs.length ? (
            <ul className="flex gap-2 list-none">
              {docs.map((post) => (
                <li key={post.id}>
                  <Link
                    href={getCollectionUrlPath('tags', post?.routing?.path)}
                  >
                    #{post.title}
                  </Link>
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
            <BlogPostsList posts={posts.docs} />

            <div className="text-right mt-10">
              <CtaLink
                href={getCollectionUrlPath('posts')}
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
