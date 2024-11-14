import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import FullPage from '@/app/(frontend)/_pageLayout/FullPage';
import Card from '@/components/Card';
import Container from '@/components/Container';
import PageTitle from '@/components/PageTitle';
import PostDate from '@/components/PostDate';
import Prose from '@/components/Prose';
import RichText from '@/components/RichText/RichText';
import Section from '@/components/Section';
import TagsList from '@/components/TagsList/TagsList';
import fetchBlogPosts from '@/content/fetchBlogPosts';
import fetchDocumentByPath from '@/content/fetchDocumentByPath';
import generateMeta from '@/content/generateMeta';
import { Post, Tag } from '@/payload/payload-types';

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

      <PageTitle>{post.title}</PageTitle>

      <Prose className="text-gray-11 grow" small>
        <RichText content={post.intro} />
      </Prose>

      {post.poster && typeof post.poster === 'object' && (
        <Image
          src={post.poster.url!}
          alt=""
          width={post.poster.width!}
          height={post.poster.height!}
          className="mx-auto"
        />
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
    <>
      <FullPage className="border-b pb-0">
        <Container size="prose">
          <article className="grid grid-cols-1 gap-16 mb-24">
            <header>
              <PostHeader post={post} />
            </header>

            <Prose>
              <RichText content={post.content} />
            </Prose>

            {post.tags && (
              <TagsList tags={post.tags as Tag[]} className="text-sm" />
            )}
          </article>
        </Container>
      </FullPage>
      <div className="py-24 bg-gray-1">
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
                          href={relatedPost.routing.path}
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
    </>
  );
};

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> =>
  generateMeta('posts', await getPost(params));

export default Page;
