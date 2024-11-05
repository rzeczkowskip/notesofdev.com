import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Card from '@/components/Card';
import Container from '@/components/Container';
import FullPage from '@/components/PageTemplate/FullPage';
import PageTitle from '@/components/PageTitle';
import PostDate from '@/components/PostDate';
import Prose from '@/components/Prose';
import RichText from '@/components/RichText/RichText';
import Section from '@/components/Section';
import TagsList from '@/components/TagsList/TagsList';
import fetchBlogPosts from '@/content/fetchBlogPosts';
import fetchDocumentByPath from '@/content/fetchDocumentByPath';

import generateMeta from '@/content/generateMeta';
import generateStaticRoutingPaths from '@/content/generateStaticRoutingPaths';
import { Post, Tag } from '@/payload/payload-types';
import getCollectionUrlPath from '@/utils/getCollectionUrlPath';

type PageProps = {
  params: Promise<{
    path: string;
  }>;
};

const getPost = async (params: PageProps['params']) => {
  return fetchDocumentByPath('posts', (await params).path);
};

const PostHeader = ({ post }: { post: Post }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <PostDate publishedAt={post.publishedAt} />

      <PageTitle title={post.title} />

      <Prose className="text-gray-11 grow" small>
        <RichText content={post.intro} />
      </Prose>

      {post.tags && (
        <div className="flex gap-2 border-y py-3">
          Tags: <TagsList tags={post.tags as Tag[]} />
        </div>
      )}
    </div>
  );
};

const Page = async ({ params }: PageProps) => {
  const post = await getPost(params);

  if (!post) {
    return notFound();
  }

  const relatedPostsByTag = await fetchBlogPosts({
    ignoredPosts: [post],
    tags: post.tags || undefined,
    limit: 5,
  });

  const randomPosts =
    relatedPostsByTag.docs.length < 5
      ? await fetchBlogPosts({
          ignoredPosts: [post, ...relatedPostsByTag.docs],
          limit: 5 - relatedPostsByTag.docs.length,
        })
      : { docs: [] };

  const relatedPosts = [...relatedPostsByTag.docs, ...randomPosts.docs];

  return (
    <FullPage>
      <Container size="prose">
        <article className="grid grid-cols-1 gap-16 mb-24">
          <header>
            <PostHeader post={post} />
          </header>

          <Prose>
            <RichText content={post.content} />
          </Prose>
        </article>
      </Container>

      <div className="bg-gray-1 border-t py-24">
        <Container size="prose">
          {relatedPosts.length > 0 && (
            <Section>
              <Card title="Related posts" className="bg-solid">
                <ul>
                  {relatedPosts.map((relatedPost) => {
                    return (
                      <li className="flex gap-2" key={relatedPost.id}>
                        <span className="text-primary-11 shrink">&mdash;</span>
                        <Link
                          href={getCollectionUrlPath(
                            'posts',
                            relatedPost?.routing?.path,
                          )}
                          className="hover:underline grow"
                        >
                          {relatedPost.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </Card>
            </Section>
          )}
        </Container>
      </div>
    </FullPage>
  );
};

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> =>
  generateMeta('posts', await getPost(params));

export const generateStaticParams = () => generateStaticRoutingPaths('posts');

export default Page;
