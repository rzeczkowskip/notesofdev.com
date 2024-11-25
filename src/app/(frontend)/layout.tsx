import '@/app/(frontend)/app.css';
import { Metadata } from 'next';
import { Bitter, Mulish } from 'next/font/google';
import Link from 'next/link';
import { ThemeProvider } from 'next-themes';
import Analytics from '@/components/Analytics';
import Container from '@/components/Container';
import Header from '@/components/Header/Header';
import { getPayload } from '@/payload/client';
import cn from '@/utils/cn';

const fontSerif = Bitter({
  subsets: [],
  variable: '--font-serif',
  weight: 'variable',
  display: 'swap',
});

const fontSans = Mulish({
  subsets: [],
  variable: '--font-sans',
  weight: 'variable',
  display: 'swap',
});

const getSiteConfig = async () => {
  const client = await getPayload();

  // @ts-expect-error cache plugin issue
  return await client.findGlobal({ slug: 'siteConfig' });
};

const Layout: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  const siteConfig = await getSiteConfig();

  return (
    <html
      className={cn(fontSerif.variable, fontSans.variable, 'font-sans')}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider attribute="class">
          <Header nav={siteConfig.nav?.main} />

          {children}

          <footer className="mb-8 pt-8 border-t border-gray-6">
            <Container>
              <p className="text-center">
                Copyright &copy;{' '}
                <Link
                  href="/"
                  className=" underline text-primary-11 hover:text-primary-12"
                >
                  {siteConfig?.general.title}
                </Link>
              </p>
            </Container>
          </footer>
        </ThemeProvider>

        <Analytics
          cloudflareToken={siteConfig.general?.cloudflareAnalyticsToken}
        />
      </body>
    </html>
  );
};

export default Layout;

export const generateMetadata = async (): Promise<Metadata> => {
  const siteConfig = await getSiteConfig();

  const title = {
    default: 'Home',
    template: `%s | ${siteConfig?.general?.title}`,
  };

  return {
    title,
  };
};
