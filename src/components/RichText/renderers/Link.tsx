import NextLink from 'next/link';
import { Renderer } from '@/payload/richText/renderer/types';
import extractLinkFieldProps from '@/utils/extractLinkFieldProps';

type LinkFields = {
  newTab?: boolean;
  url: string;
  doc?: { relationTo: string; value: { routing: { path: string } } };
  linkType: 'internal' | 'custom';
};

const Link: Renderer<{
  fields?: LinkFields;
}> = async ({ data, ...props }) => {
  const {
    node: { fields: linkOptions },
  } = data;

  if (!linkOptions) {
    return null;
  }

  return <NextLink {...props} {...extractLinkFieldProps(linkOptions)} />;
};

export default Link;
