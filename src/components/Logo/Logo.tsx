import LogoImage from './logo.svg';
import cn from '@/utils/cn';

type LogoProps = {
  className?: string;
};

const Logo = ({ className }: LogoProps) => {
  return <LogoImage className={cn('h-12 w-auto block', className)} />;
};

export default Logo;
