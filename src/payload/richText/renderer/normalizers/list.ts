import { LexicalNode, LexicalNodeNormalizer } from '../types';

export const normalizeNestedLists: LexicalNodeNormalizer = (
  node: LexicalNode,
) => {
  if (node.type !== 'list') {
    return node;
  }
  const newChildren: LexicalNode[] = [];
  const childIndexesToSkip: number[] = [];

  node.children?.forEach((child, i) => {
    if (childIndexesToSkip.includes(i)) {
      return;
    }

    const nextChild = node?.children?.[i + 1];

    const nextChildHasList =
      nextChild?.type === 'listitem' &&
      nextChild?.children?.some((next) => {
        return next.type === 'list';
      });

    if (!nextChildHasList) {
      newChildren.push(child);
      return;
    }

    childIndexesToSkip.push(i + 1);
    newChildren.push({
      ...child,
      children: [...(child.children || []), ...(nextChild?.children ?? [])],
    });
  });

  return {
    ...node,
    children: newChildren,
  };
};
