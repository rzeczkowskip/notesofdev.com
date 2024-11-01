import React from 'react';
import {
  ClassOrStyleProp,
  LexicalNode,
  LexicalNodeNormalizer,
  RichTextRendererOptions,
} from './types';

export const getNodeProps = (
  node: LexicalNode,
  styles?: RichTextRendererOptions['styles'],
): { className?: string; style?: React.CSSProperties } => {
  const props: (ClassOrStyleProp | undefined)[] = [];

  if (!node) {
    return {};
  }

  if (
    String(node?.format).toString()?.includes('left') &&
    node.direction !== 'ltr'
  ) {
    props.push(styles?.textAlign?.left);
  }

  if (String(node?.format).toString()?.includes('center')) {
    props.push(styles?.textAlign?.center);
  }

  if (
    String(node?.format).toString()?.includes('right') &&
    node.direction !== 'rtl'
  ) {
    props.push(styles?.textAlign?.right);
  }

  if (
    String(node?.format).toString()?.includes('justify') &&
    node.direction !== 'rtl'
  ) {
    props.push(styles?.textAlign?.justify);
  }

  const indent = parseInt(`${node?.indent || 0}`, 10);
  if (!isNaN(indent) && indent !== 0) {
    props.push(styles?.indent?.(indent));
  }

  const { classNames, style } = props.reduce(
    (cumulated, current) => {
      if (!current) {
        return cumulated;
      }

      if (typeof current === 'string') {
        return {
          ...cumulated,
          classNames: [...cumulated.classNames, current],
        };
      }

      return {
        ...cumulated,
        style: {
          ...(cumulated?.style || {}),
          ...current,
        },
      };
    },
    {
      classNames: [] as string[],
      style: {} as React.CSSProperties,
    },
  );

  return {
    className: classNames.filter(Boolean).join(' ') || undefined,
    style: Object.keys(style).length > 0 ? style : undefined,
  };
};

export const normalizeLexicalNode: LexicalNodeNormalizer = (
  node,
  normalizers,
  options?: RichTextRendererOptions,
) => {
  return normalizers.reduce((currentNode, normalizer) => {
    return normalizer(currentNode, normalizers, options);
  }, node);
};
