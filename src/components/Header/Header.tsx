import Link from 'next/link';
import Container from '@/components/Container';
import Nav from '@/components/Header/NavBar/Nav';
import NavBar from '@/components/Header/NavBar/NavBar';
import Logo from '@/components/Logo/Logo';
import { Nav as SiteNav } from '@/payload/payload-types';
import cn from '@/utils/cn';

type HeaderProps = {
  nav?: SiteNav;
};

const Header = ({ nav }: HeaderProps) => {
  return (
    <header className="mb-4">
      <Container
        size="full"
        className={cn('flex items-center justify-between')}
      >
        <Link href="/">
          <Logo className="w-14 bg-primary-3 text-center" />
        </Link>

        {nav && nav.length && (
          <NavBar toggleAriaLabel="Toggle menu">
            <Nav items={nav} />
          </NavBar>
        )}
      </Container>
    </header>
  );
};

export default Header;
