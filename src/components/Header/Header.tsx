import Link from 'next/link';
import Container from '@/components/Container';
import Logo from '@/components/Logo/Logo';
import { Nav } from '@/payload/payload-types';
import cn from '@/utils/cn';

type HeaderProps = {
  nav?: Nav;
};

const Header = ({}: HeaderProps) => {
  return (
    <header className="mb-4">
      <Container className={cn('flex items-center justify-between')}>
        <Link href="/">
          <Logo className="w-14 bg-primary-3 text-center" />
        </Link>
      </Container>
    </header>
  );
};

export default Header;
