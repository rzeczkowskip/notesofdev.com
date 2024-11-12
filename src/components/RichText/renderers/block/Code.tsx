import CodeBlockComponent from '@/components/CodeBlock/CodeBlock';

import type { CodeBlock } from '@/payload/payload-types';

type CodeProps = {
  block: CodeBlock;
};

const Code = ({ block }: CodeProps) => {
  if (!block.code) {
    return null;
  }

  return (
    <CodeBlockComponent
      code={block.code}
      language={block.language}
      lineNumbers={block.language !== 'shell'}
      copy={block.language !== 'shell'}
    />
  );
};

export default Code;
