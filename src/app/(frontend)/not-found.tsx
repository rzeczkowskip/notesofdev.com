import Image from 'next/image';
import image404 from '@/app/(frontend)/404.gif';
import PageWithSidebar from '@/app/(frontend)/_pageLayout/PageWithSidebar';
import Container from '@/components/Container';
import PageTitle from '@/components/PageTitle';
import Prose from '@/components/Prose';

const NotFound = () => {
  return (
    <Container>
      <PageWithSidebar>
        <PageTitle>Hmmm... Not found</PageTitle>

        <Prose className="font-sans">
          <p>The page you are looking for couldn&apos;t be found.</p>
          <p>I probably broke something :)</p>

          <Image src={image404} alt="" priority className="mx-auto" />
        </Prose>
      </PageWithSidebar>
    </Container>
  );
};

export default NotFound;
