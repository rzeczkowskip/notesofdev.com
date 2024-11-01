import type { ComponentProps } from 'react';
import Block from '@/components/RichText/renderers/Block';
import Link from '@/components/RichText/renderers/Link';
import Upload from '@/components/RichText/renderers/Upload';
import { APP_DEBUG } from '@/contants';
import RichTextRenderer from '@/payload/richText/renderer/RichTextRenderer';

type RichTextProps = {
  content?: ComponentProps<typeof RichTextRenderer>['childrenNodes'] | null;
};

const RichText = ({ content }: RichTextProps) => {
  if (!content) {
    return null;
  }

  return (
    <RichTextRenderer
      childrenNodes={content}
      options={{
        debug: APP_DEBUG,
        styles: {
          textAlign: {
            left: 'text-left',
            center: 'text-center',
            right: 'text-right',
            justify: 'text-justify',
          },
          indent: (level) => ({
            marginLeft: `${level}rem`,
          }),
        },
        renderers: {
          link: Link,
          block: Block,
          upload: Upload,
        },
      }}
    />
  );
};

export default RichText;
