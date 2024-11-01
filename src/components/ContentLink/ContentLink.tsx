import NextLink from 'next/link';
import InternalLink from '@/components/ContentLink/InternalLink';
import {
  extractCustomLinkHref,
  extractInternalLinkPath,
} from '@/components/ContentLink/extractors';
import type { ContentLinkProps } from '@/components/ContentLink/types';

const ContentLink = ({
  linkType,
  url,
  doc,
  newTab,
  ...props
}: ContentLinkProps) => {
  const target = newTab ? '_blank' : props?.target;

  if (linkType === 'internal' && doc?.relationTo) {
    return (
      <InternalLink
        {...props}
        collection={doc.relationTo}
        path={extractInternalLinkPath(doc)}
        target={target}
      />
    );
  }

  return (
    <NextLink {...props} href={extractCustomLinkHref(url)} target={target} />
  );
};

export default ContentLink;
