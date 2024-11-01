import { LinkProps } from 'next/link';
import { LinkField } from '@/payload/custom-types';

export type ContentLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps,
  'href'
> &
  LinkField;
