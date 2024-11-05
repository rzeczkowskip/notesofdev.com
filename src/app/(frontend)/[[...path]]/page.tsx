import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPostsList from '@/components/BlogPostsList/BlogPostsList';
import Card from '@/components/Card';
import Container from '@/components/Container';
import CtaLink from '@/components/CtaLink/CtaLink';
import FullPage from '@/components/PageTemplate/FullPage';
import PageWithSidebar from '@/components/PageTemplate/PageWithSidebar';
import PageTitle from '@/components/PageTitle';
import Prose from '@/components/Prose';
import RichText from '@/components/RichText/RichText';
import Section from '@/components/Section';
import TagsList from '@/components/TagsList/TagsList';
import fetchBlogPosts from '@/content/fetchBlogPosts';
import fetchDocumentByPath from '@/content/fetchDocumentByPath';
import generateMeta from '@/content/generateMeta';
import generateStaticRoutingPaths from '@/content/generateStaticRoutingPaths';
import { getPayload } from '@/payload/client';
import getCollectionUrlPath from '@/utils/getCollectionUrlPath';

type PageProps = {
  params: Promise<{
    path?: string[];
  }>;
};

const getPage = async (params: PageProps['params']) => {
  return fetchDocumentByPath('pages', (await params).path || []);
};

const Page = async ({ params }: PageProps) => {
  const page = await getPage(params);

  if (!page) {
    return notFound();
  }

  if (page?.routing?.path === '/') {
    const client = await getPayload();
    const posts = await fetchBlogPosts({});

    const tags = await client.find({
      collection: 'tags',
      sort: '-updatedAt',
      depth: 0,
    });

    return (
      <Container>
        <PageWithSidebar
          header={page.showTitle ? <PageTitle title={page.title} /> : undefined}
          sidebarItems={[
            <Card title="Tags" key="tags">
              <TagsList tags={tags.docs} className="text-sm" />
            </Card>,
          ]}
        >
          <div className="grid grid-cols-1 gap-16">
            {posts?.docs && (
              <Section title="Latest posts">
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
              </Section>
            )}

            <Prose>
              <RichText content={page.content} />
            </Prose>
          </div>
        </PageWithSidebar>
      </Container>
    );
  }

  return (
    <FullPage>
      <Prose>
        <RichText content={page.content} />
      </Prose>
    </FullPage>
  );
};

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> =>
  generateMeta('pages', await getPage(params));

export const generateStaticParams = () =>
  generateStaticRoutingPaths('pages', {
    pathAsArray: true,
  });

export default Page;
