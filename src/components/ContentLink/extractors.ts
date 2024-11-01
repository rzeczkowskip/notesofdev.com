import { ContentLinkProps } from '@/components/ContentLink/types';

export const extractCustomLinkHref = (url: ContentLinkProps['url']): string => {
  return url || '#';
};

export const extractInternalLinkPath = (
  doc: ContentLinkProps['doc'],
): string | undefined => {
  if (!doc?.value || typeof doc.value === 'string') {
    return;
  }

  return doc.value?.routing?.path || undefined;
};
