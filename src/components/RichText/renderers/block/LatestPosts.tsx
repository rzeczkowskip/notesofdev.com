import { ArrowRightIcon } from '@heroicons/react/24/solid';
import BlogLatestPosts from '@/components/BlogLatestPosts/BlogLatestPosts';
import CtaLink from '@/components/CtaLink/CtaLink';
import Section from '@/components/Section';
import { LatestPostsBlock } from '@/payload/payload-types';
import extractLinkFieldProps from '@/utils/extractLinkFieldProps';

type LatestPostsProps = {
  block: LatestPostsBlock;
};

const LatestPosts = ({ block }: LatestPostsProps) => {
  return (
    <Section title="Latest posts" className="not-prose text-base font-sans">
      <BlogLatestPosts postCount={block.postCount} />

      {block.withBlogLink && block.blogPage && (
        <div className="text-right mt-10">
          <CtaLink
            {...extractLinkFieldProps(block.blogPage)}
            icon={<ArrowRightIcon className="h-4 w-4" />}
            iconPosition="end"
          >
            View all posts
          </CtaLink>
        </div>
      )}
    </Section>
  );
};

export default LatestPosts;
