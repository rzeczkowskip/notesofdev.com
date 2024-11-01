import ContentLink from '@/components/ContentLink/ContentLink';
import { Renderer } from '@/payload/richText/renderer/types';

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

  return <ContentLink {...props} {...linkOptions} />;
};

export default Link;
