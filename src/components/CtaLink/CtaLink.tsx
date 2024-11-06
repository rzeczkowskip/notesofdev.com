import Link, { LinkProps } from 'next/link';
import { EnumLike } from '@/types';
import cn from '@/utils/cn';

const CtaLinkType = {
  Primary: 'primary',
  Secondary: 'secondary',
  Neutral: 'neutral',
} as const;

const IconPosition = {
  Start: 'start',
  End: 'end',
} as const;

type CtaLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  LinkProps & {
    type?: EnumLike<typeof CtaLinkType>;
    icon?: React.ReactNode;
    iconPosition?: EnumLike<typeof IconPosition>;
    iconClassName?: string;
  };

const CtaLink = ({
  type = CtaLinkType.Neutral,
  icon,
  iconPosition,
  children,
  className,
  iconClassName,
  ...props
}: CtaLinkProps) => {
  return (
    <Link
      className={cn(
        'transition',
        'group',
        'inline-flex items-center justify-center gap-2',
        iconPosition === IconPosition.End && 'flex-row-reverse',
        'px-4 py-2 border border-transparent',
        ' whitespace-nowrap font-medium',
        type === CtaLinkType.Primary &&
          'text-primary-contrast bg-primary-9 hover:bg-primary-10 active:bg-primary-11',
        type === CtaLinkType.Secondary &&
          'bg-primary-3 hover:bg-primary-4 active:bg-primary-5 text-gray-12',
        type === CtaLinkType.Neutral &&
          'bg-transparent hover:bg-gray-2 active:bg-gray-3 text-gray-12',
        className,
      )}
      {...props}
    >
      <div className={iconClassName}>{icon}</div>
      {children}
    </Link>
  );
};

export default CtaLink;
