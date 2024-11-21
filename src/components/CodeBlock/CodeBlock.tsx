import '@/components/CodeBlock/syntax.css';
import CopyCodeButton from '@/components/CodeBlock/CopyCodeButton';
import { hljs } from '@/lib/hljs';

type CodeBlockProps = {
  code: string;
  language?: string;
  lineNumbers?: boolean;
  copy?: boolean;
};

// why while? that's why: https://stackoverflow.com/questions/3746725/how-to-create-an-array-containing-1-n/65244270#65244270
const getLineNumbers = (code: string) => {
  const lines = code.split('\n').length;
  let i = 0;
  const array = Array(lines);

  while (i < lines) {
    array[i++] = i;
  }

  return array.join('\n');
};

const CodeBlock = ({
  code,
  language,
  lineNumbers = true,
  copy = true,
}: CodeBlockProps) => {
  const highlightLanguage =
    language && hljs.getLanguage(language) ? language : 'plaintext';

  const highlightedCodeHtml = hljs.highlight(code, {
    language: highlightLanguage,
  }).value;

  return (
    <div className="relative flex flex-nowrap bg-primary-2 text-gray-12 dark prose-pre:my-0 rounded-md">
      {copy && (
        <CopyCodeButton code={code} className="top-4 right-4 absolute" />
      )}
      {lineNumbers && (
        <pre className="text-gray-11 border-r text-right grow-0 select-none">
          {getLineNumbers(code)}
        </pre>
      )}
      <pre className="hljs grow">
        <code dangerouslySetInnerHTML={{ __html: highlightedCodeHtml }} />
      </pre>
    </div>
  );
};

export default CodeBlock;
