'use client';

import { usePathname } from 'next/navigation';
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import NavToggle from '@/components/Header/NavBar/NavToggle';
import useOnClickOutside from '@/hooks/useOnClickOutside';

type NavProps = PropsWithChildren<{
  toggleAriaLabel?: string;
}>;

const NavBar: React.FC<NavProps> = ({ children, toggleAriaLabel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const closeNav = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  useOnClickOutside(ref, closeNav);
  const pathname = usePathname();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(closeNav, [pathname]);

  return (
    <nav className="flex items-center" ref={ref} id="nav" aria-hidden={isOpen}>
      <NavToggle
        toggle={toggleNav}
        className="lg:hidden"
        ariaLabel={toggleAriaLabel}
        ariaControls={'nav'}
      />

      <div
        className={`
        font-semibold
        flex flex-col gap-4 items-start
        lg:justify-end lg:items-center
        lg:static lg:w-auto lg:drop-shadow-none lg:translate-x-0
        lg:flex-row lg:p-0
        fixed bottom-0 top-0 right-0 z-40
        px-4 py-6
        w-72 max-w-full
        drop-shadow
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        bg-gray-1 lg:bg-transparent
        transition-transform duration-300 ease-in-out
        h-auto lg:h-auto
      `}
      >
        <NavToggle
          toggle={toggleNav}
          isOpen={true}
          className="lg:hidden ml-auto mr-0 mb-4"
          ariaLabel={toggleAriaLabel}
          ariaControls={'nav'}
        />

        {children}
      </div>
    </nav>
  );
};

export default NavBar;
