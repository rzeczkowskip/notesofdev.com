import { PaginatedDocs } from 'payload';
import Page from '@/app/(frontend)/[[...path]]/page';
import ProjectsList from '@/components/ProjectsList/ProjectsList';
import Section from '@/components/Section';
import { STATIC_ROUTES } from '@/contants';
import { getPayload } from '@/payload/client';
import { Project } from '@/payload/payload-types';

export const dynamic = 'force-dynamic';

const Projects = async () => {
  const client = await getPayload();
  // @ts-expect-error cache plugin issue
  const { docs: projects } = (await client.find({
    collection: 'projects',
    sort: 'name',
    limit: 0,
    pagination: false,
  })) as PaginatedDocs<Project>;

  return (
    <Page
      customPage
      params={Promise.resolve({ path: [STATIC_ROUTES.Projects] })}
      pageTitle={'Projects'}
      beforeContent={
        projects && (
          <div className="grid grid-cols-1 gap-16">
            {projects && (
              <Section>
                <ProjectsList projects={projects} />
              </Section>
            )}
          </div>
        )
      }
    />
  );
};

export default Projects;
