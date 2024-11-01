import cn from '@/utils/cn';

type LogoProps = {
  className?: string;
};

const Logo = ({ className }: LogoProps) => {
  return <div className={cn('flex items-center h-14 w-14', className)}>L</div>;
};

export default Logo;
