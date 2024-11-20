import ListItem from '@/components/ProjectsList/ListItem';
import { Project } from '@/payload/payload-types';
import cn from '@/utils/cn';

type ProjectsListProps = {
  projects: Project[];
  columns?: 1 | 2;
};

const ProjectsList = ({ projects, columns = 2 }: ProjectsListProps) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-5',
        columns === 2 && 'md:grid-cols-2',
      )}
    >
      {projects.map((project) => (
        <ListItem project={project} key={project.id} />
      ))}
    </div>
  );
};

export default ProjectsList;
