import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import React from 'react';

type NavToggleProps = {
  toggle: () => void;
  isOpen?: boolean;
  className?: string;
  ariaControls?: string;
  ariaLabel?: string;
};

const NavToggle: React.FC<NavToggleProps> = ({
  className,
  toggle,
  isOpen = false,
  ariaControls,
  ariaLabel,
}) => (
  <button
    className={className}
    onClick={toggle}
    aria-label={ariaLabel}
    aria-controls={ariaControls}
    aria-expanded={isOpen}
    aria-haspopup={true}
  >
    {isOpen ? (
      <XMarkIcon className="w-8 h-8" />
    ) : (
      <Bars3BottomRightIcon className="w-8 h-8" />
    )}
  </button>
);

export default NavToggle;
