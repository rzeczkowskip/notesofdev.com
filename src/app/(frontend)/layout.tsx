import '@/app/(frontend)/app.css';
import { Metadata } from 'next';
import Link from 'next/link';
import Container from '@/components/Container';
import ContentLink from '@/components/ContentLink/ContentLink';
import { getPayload } from '@/payload/client';
import type { Nav as SiteNav } from '@/payload/payload-types';
import cn from '@/utils/cn';

const getSiteConfig = async () => {
  const client = await getPayload();

  return await client.findGlobal({ slug: 'siteConfig' });
};

const Nav = ({
  nav,
  isSubmenu,
  className,
}: {
  nav?: SiteNav;
  isSubmenu?: boolean;
  className?: string;
}) => {
  if (!nav || !nav.length) {
    return null;
  }

  const Comp = isSubmenu ? 'div' : 'nav';

  return (
    <Comp className={cn('flex gap-2', className)}>
      {nav.map((item) => {
        if (item.type === 'submenu') {
          return (
            <div className="flex gap-2" key={item.id}>
              <strong>{item.label}</strong>
              <Nav nav={item.items} isSubmenu key={item.id} className="mt-2" />
            </div>
          );
        }

        if (!item.link) {
          return null;
        }

        return (
          <ContentLink
            key={item.id}
            className="text-primary-9 hover:text-primary-12"
            {...item.link}
          >
            {item.label}
          </ContentLink>
        );
      })}
    </Comp>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  const siteConfig = await getSiteConfig();

  return (
    <html>
      <body className="text-gray-12">
        <header className={cn('mb-8 py-4')}>
          <Container fullWidth>
            <div>
              <Link href="/" className="hover:underline font-semibold text-lg">
                {siteConfig?.general?.title || 'Riveo Payload Starter'}
              </Link>
            </div>

            <Nav nav={siteConfig?.nav?.main} className="mt-4" />
          </Container>
        </header>

        <main className="my-8">
          <Container>{children}</Container>
        </main>

        <footer className="my-8 pt-8 border-t border-gray-6">
          <Container>
            <Nav nav={siteConfig?.nav?.footer} className="mb-2" />
            <p className="text-center">
              Copyright &copy;{' '}
              <Link
                href="/"
                className=" underline text-primary-8 hover:text-primary-12"
              >
                {siteConfig?.general.title}
              </Link>
            </p>
          </Container>
        </footer>
      </body>
    </html>
  );
};

export default Layout;

export const generateMetadata = async (): Promise<Metadata> => {
  const siteConfig = await getSiteConfig();

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    ),
    openGraph: {
      siteName: siteConfig?.general?.title,
      title: siteConfig?.general?.title,
    },
    title: siteConfig?.general?.title,
  };
};
