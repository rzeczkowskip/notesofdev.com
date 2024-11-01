import type { SerializedLexicalNode } from 'lexical';
import React from 'react';
export type { SerializedEditorState } from 'lexical';

export const IS_BOLD = 1;
export const IS_ITALIC = 1 << 1;
export const IS_STRIKETHROUGH = 1 << 2;
export const IS_UNDERLINE = 1 << 3;
export const IS_CODE = 1 << 4;
export const IS_SUBSCRIPT = 1 << 5;
export const IS_SUPERSCRIPT = 1 << 6;
export const IS_HIGHLIGHT = 1 << 7;

export type NodeFormat =
  | typeof IS_BOLD
  | typeof IS_ITALIC
  | typeof IS_STRIKETHROUGH
  | typeof IS_UNDERLINE
  | typeof IS_CODE
  | typeof IS_SUBSCRIPT
  | typeof IS_SUPERSCRIPT
  | typeof IS_HIGHLIGHT;

export type ClassOrStyleProp = string | React.CSSProperties;

export type RichTextRendererOptions = {
  checkboxList?: {
    checkedComponent?: React.ReactElement;
    uncheckedComponent?: React.ReactElement;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  blocksMapper?: React.FC<{ block: { blockType: any } }>;
  debug?: boolean;

  styles?: {
    textAlign?: {
      left?: ClassOrStyleProp;
      right?: ClassOrStyleProp;
      center?: ClassOrStyleProp;
      justify?: ClassOrStyleProp;
    };
    indent?: (level: number) => ClassOrStyleProp;
  };
  renderers?: Record<string, Renderer>;
  normalizers?: LexicalNodeNormalizer[];
};

export type LexicalNode<P extends object = object> = SerializedLexicalNode &
  P & {
    text?: string;
    children?: LexicalNode[];
    format?: NodeFormat;
    indent?: number;
    direction?: 'ltr' | 'rtl';
  };

export type Renderer<LexicalNodeProps extends object = object> = React.FC<
  React.PropsWithChildren<{
    data: {
      node: LexicalNode<LexicalNodeProps>;
      ancestors?: LexicalNode[];
      options?: RichTextRendererOptions;
    };
    className?: string;
    style?: React.CSSProperties;
  }>
>;

export type LexicalNodeNormalizer = (
  node: LexicalNode,
  normalizers: LexicalNodeNormalizer[],
  options?: RichTextRendererOptions,
) => LexicalNode;
