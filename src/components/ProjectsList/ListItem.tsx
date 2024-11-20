import { ArrowRightIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import Card from '@/components/Card';
import Prose from '@/components/Prose';
import RichText from '@/components/RichText/RichText';
import { Project } from '@/payload/payload-types';

type ListItemProps = {
  project: Project;
};

const ListItem = ({ project }: ListItemProps) => {
  const title = (
    <div className="flex justify-between items-center flex-nowrap">
      <span>{project.name}</span>
      <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
    </div>
  );
  return (
    <Link href={project.routing.path} className="group">
      <Card className="group-hover:border-gray-8" title={title}>
        <Prose small className="font-sans">
          <RichText content={project.shortDescription} />
        </Prose>
      </Card>
    </Link>
  );
};

export default ListItem;
