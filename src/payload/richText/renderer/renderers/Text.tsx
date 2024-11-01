//Taken from: https://github.com/facebook/lexical/blob/c2ceee223f46543d12c574e62155e619f9a18a5d/packages/lexical/src/LexicalConstants.ts
import {
  IS_BOLD,
  IS_CODE,
  IS_HIGHLIGHT,
  IS_ITALIC,
  IS_STRIKETHROUGH,
  IS_SUBSCRIPT,
  IS_UNDERLINE,
} from '../types';
import type { NodeFormat, Renderer } from '../types';

const formatters: {
  [key: NodeFormat]: (child: React.ReactElement | string) => React.ReactElement;
} = {
  [IS_BOLD]: (child) => <strong>{child}</strong>,
  [IS_ITALIC]: (child) => <em>{child}</em>,
  [IS_STRIKETHROUGH]: (child) => <del>{child}</del>,
  [IS_UNDERLINE]: (child) => <u>{child}</u>,
  [IS_CODE]: (child) => <code>{child}</code>,
  [IS_SUBSCRIPT]: (child) => <sub>{child}</sub>,
  [IS_SUBSCRIPT]: (child) => <sup>{child}</sup>,
  [IS_HIGHLIGHT]: (child) => <mark>{child}</mark>,
};

const Text: Renderer = ({ data, className, style }) => {
  const text = data.node?.text || '';
  const wrappedText = className ? (
    <span className={className} style={style}>
      {text}
    </span>
  ) : (
    text
  );

  const formattedText = Object.entries(formatters).reduce(
    (text, [key, formatter]) => {
      return data.node?.format && data.node.format & Number(key)
        ? formatter(text)
        : text;
    },
    wrappedText,
  );

  return <>{formattedText}</>;
};

export default Text;
