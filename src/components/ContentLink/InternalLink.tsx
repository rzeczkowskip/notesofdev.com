import NextLink, { LinkProps } from 'next/link';
import { CollectionSlug } from 'payload';
import getContentTypePath from '@/utils/getContentTypePath';

export type InternalLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps,
  'href'
> & {
  collection: CollectionSlug | string;
  path?: string | null;
};

const InternalLink = ({ collection, path, ...props }: InternalLinkProps) => {
  return (
    <NextLink
      {...props}
      href={getContentTypePath(collection as CollectionSlug, path)}
    />
  );
};

export default InternalLink;
