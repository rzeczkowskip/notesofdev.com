import Code from '@/components/RichText/renderers/block/Code';
import LatestPosts from '@/components/RichText/renderers/block/LatestPosts';
import { CodeBlock, LatestPostsBlock } from '@/payload/payload-types';
import { Renderer } from '@/payload/richText/renderer/types';

type Blocks = CodeBlock | LatestPostsBlock;

const Block: Renderer<{
  fields?: Blocks;
}> = async ({ data }) => {
  const blockType = data.node.fields?.blockType;

  switch (data.node.fields?.blockType) {
    case 'code':
      return <Code block={data.node.fields} />;
    case 'latestPosts':
      return <LatestPosts block={data.node.fields} />;
    default:
      if (data.options?.debug) {
        // eslint-disable-next-line no-console
        console.error(`Unsupported block type ${blockType}`);
      }

      return null;
  }
};

export default Block;
