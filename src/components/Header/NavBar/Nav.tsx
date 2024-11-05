import Link from 'next/link';
import React from 'react';
import { Nav as NavItems } from '@/payload/payload-types';
import extractLinkFieldProps from '@/utils/extractLinkFieldProps';

type NavProps = {
  items: NonNullable<NavItems>;
};

const Nav: React.FC<NavProps> = ({ items }) => (
  <>
    {items.map(({ id, label, link }) =>
      link ? (
        <Link
          key={`${id}`}
          className={'lg:py-2 hover:underline hover:text-primary-11'}
          {...extractLinkFieldProps(link)}
        >
          {label}
        </Link>
      ) : null,
    )}
  </>
);

export default Nav;
