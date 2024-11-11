import { LinkField } from '@/payload/custom-types';

const getCustomLinkHref = (url: LinkField['url']): string => {
  return url || '#';
};

const getInternalLinkHref = (doc: LinkField['doc']): string => {
  if (!doc?.value || typeof doc.value === 'string') {
    return '#';
  }

  return doc.value.routing.path;
};

const extractLinkFieldProps = (link: LinkField) => {
  const target = link.newTab ? '_blank' : undefined;

  if (link.linkType === 'internal' && link?.doc?.relationTo) {
    return {
      target,
      href: getInternalLinkHref(link.doc) || '#',
    };
  }

  return {
    target,
    href: getCustomLinkHref(link.url),
  };
};

export default extractLinkFieldProps;
