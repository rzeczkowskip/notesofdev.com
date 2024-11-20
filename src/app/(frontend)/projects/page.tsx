import PageWithSidebar from '@/app/(frontend)/_pageLayout/PageWithSidebar';
import Container from '@/components/Container';
import PageTitle from '@/components/PageTitle';
import ProjectsList from '@/components/ProjectsList/ProjectsList';
import Section from '@/components/Section';
import fetchDocumentByPath from '@/content/fetchDocumentByPath';
import { getPayload } from '@/payload/client';

const Page = async () => {
  const client = await getPayload();
  const { docs: projects } = await client.find({
    collection: 'projects',
    sort: 'name',
    limit: 0,
    pagination: false,
  });

  const page = await fetchDocumentByPath('pages', '/projects');

  return (
    <Container>
      <PageWithSidebar>
        {page?.showTitle !== false && (
          <PageTitle>{page?.title || 'Projects'}</PageTitle>
        )}
        <div className="grid grid-cols-1 gap-16">
          {projects && (
            <Section>
              <ProjectsList projects={projects} />
            </Section>
          )}
        </div>
      </PageWithSidebar>
    </Container>
  );
};

export default Page;
