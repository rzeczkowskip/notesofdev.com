import Link from 'next/link';
import React from 'react';
import { Nav as NavItems } from '@/payload/payload-types';

type NavProps = {
  items: NonNullable<NavItems>;
};

const Nav: React.FC<NavProps> = ({ items }) => (
  <>
    {items.map(({ label }) => (
      <Link
        key={`${label}${label}`}
        href={label}
        className={'lg:py-2 hover:underline hover:text-primary-11'}
      >
        {label}
      </Link>
    ))}
  </>
);

export default Nav;
