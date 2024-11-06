import type { Block } from 'payload';
import link from '@/payload/fields/link';

const LatestPostsBlock: Block = {
  slug: 'latestPosts',
  interfaceName: 'LatestPostsBlock',
  fields: [
    {
      name: 'postCount',
      type: 'number',
      defaultValue: 5,
      required: true,
    },
    {
      name: 'withBlogLink',
      label: 'Enable blog link',
      type: 'checkbox',
      required: false,
      defaultValue: true,
    },
    link(
      {
        name: 'blogPage',
        label: 'Blog link',
        admin: {
          condition: (_, siblingData) => {
            return siblingData?.withBlogLink;
          },
        },
      },
      {
        withLabel: false,
      },
    ),
  ],
};

export default LatestPostsBlock;
