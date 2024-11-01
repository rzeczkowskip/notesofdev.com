import { CodeBlock } from '@/payload/payload-types';

type CodeProps = {
  block: CodeBlock;
};

const Code = ({ block }: CodeProps) => {
  if (!block.code) {
    return null;
  }

  return (
    <pre>
      <code>{block.code}</code>
    </pre>
  );
};

export default Code;
