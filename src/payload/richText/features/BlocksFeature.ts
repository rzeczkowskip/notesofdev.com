import {
  BlocksFeature as PayloadBlockFeature,
  BlocksFeatureProps,
} from '@payloadcms/richtext-lexical';
import { Block, Config } from 'payload';

const withSpecificRichTextEditor = (
  blocks: Block[],
  editor: Config['editor'],
): Block[] => {
  return blocks.map((block) => {
    const fields = block.fields.map((field) => {
      if (field.type !== 'richText' || field.editor !== undefined) {
        return field;
      }

      return {
        ...field,
        editor,
      };
    });

    return { ...block, fields };
  });
};

const BlocksFeature = (
  config: BlocksFeatureProps,
  richTextEditor: Config['editor'],
) => {
  return PayloadBlockFeature({
    blocks: withSpecificRichTextEditor(config.blocks!, richTextEditor),
    inlineBlocks: withSpecificRichTextEditor(
      config.inlineBlocks!,
      richTextEditor,
    ),
  });
};

export default BlocksFeature;
