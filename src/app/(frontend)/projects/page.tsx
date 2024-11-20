import Page from '@/app/(frontend)/[[...path]]/page';
import ProjectsList from '@/components/ProjectsList/ProjectsList';
import Section from '@/components/Section';
import { STATIC_ROUTES } from '@/contants';
import { getPayload } from '@/payload/client';

const Projects = async () => {
  const client = await getPayload();
  const { docs: projects } = await client.find({
    collection: 'projects',
    sort: 'name',
    limit: 0,
    pagination: false,
  });

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
