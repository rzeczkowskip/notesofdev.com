import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageWithSidebar from '@/app/(frontend)/_pageLayout/PageWithSidebar';
import Container from '@/components/Container';
import PageTitle from '@/components/PageTitle';
import Prose from '@/components/Prose';
import RichText from '@/components/RichText/RichText';
import fetchDocumentByPath from '@/content/fetchDocumentByPath';
import generateMeta from '@/content/generateMeta';

type PageProps = {
  params: Promise<{
    path: string;
  }>;
};

const getProject = async (params: PageProps['params']) => {
  return fetchDocumentByPath('projects', (await params).path);
};

const Page = async ({ params }: PageProps) => {
  const project = await getProject(params);

  if (!project) {
    return notFound();
  }

  return (
    <Container>
      <PageWithSidebar>
        <PageTitle>{project.name}</PageTitle>

        <Prose>
          <RichText content={project.description} />
        </Prose>
      </PageWithSidebar>
    </Container>
  );
};

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> =>
  generateMeta('projects', await getProject(params));

export default Page;
