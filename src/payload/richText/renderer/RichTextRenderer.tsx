/* eslint-disable react/no-children-prop */

import defaultRenderers from './renderers';
import type {
  LexicalNode,
  SerializedEditorState,
  RichTextRendererOptions,
} from './types';
import { getNodeProps, normalizeLexicalNode } from './utils';
import defaultNormalizers from '@/payload/richText/renderer/normalizers';

type RichTextRendererProps = {
  childrenNodes: LexicalNode[] | SerializedEditorState;
  ancestorNodes?: LexicalNode[];
  options?: RichTextRendererOptions;
};

const RichTextRenderer: React.FC<RichTextRendererProps> = ({
  childrenNodes,
  ancestorNodes,
  options,
}) => {
  const nodes =
    'root' in childrenNodes ? childrenNodes?.root?.children : childrenNodes;

  const renderers = { ...defaultRenderers, ...(options?.renderers || {}) };
  const normalizers = [...defaultNormalizers, ...(options?.normalizers || [])];

  if (!Array.isArray(nodes)) {
    return null;
  }

  const renderedChildren = nodes.map((node, ix) => {
    if (!node) {
      return null;
    }

    const normalizedNode = normalizeLexicalNode(node, normalizers, options);

    const RendererComponent = renderers?.[node?.type];

    if (!RendererComponent) {
      return options?.debug ? (
        <span
          style={{
            display: 'block',
            fontFamily: 'monospace',
            backgroundColor: 'rgba(255,0,0,.1)',
            paddingLeft: '1rem',
            fontSize: '0.8rem',
          }}
          key={ix}
        >
          Unsupported node: {node.type}
        </span>
      ) : null;
    }

    const nodeProps = getNodeProps(normalizedNode || '', options?.styles);

    const children = normalizedNode?.children ? (
      <RichTextRenderer
        childrenNodes={normalizedNode.children}
        ancestorNodes={[normalizedNode, ...(ancestorNodes || [])]}
        options={options}
      />
    ) : null;

    return (
      <RendererComponent
        {...nodeProps}
        key={ix}
        data={{ node: normalizedNode, ancestors: ancestorNodes, options }}
        children={children}
      />
    );
  });

  return <>{renderedChildren.filter((node) => node !== null)}</>;
};

export default RichTextRenderer;
