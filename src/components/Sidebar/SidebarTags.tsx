import Card from '@/components/Card';
import TagsList from '@/components/TagsList/TagsList';
import { Tag } from '@/payload/payload-types';

type SidebarTagsProps = {
  tags: Tag[];
};

const SidebarTags = ({ tags }: SidebarTagsProps) => {
  return (
    <Card title="Tags">
      <TagsList tags={tags} className="text-sm" />
    </Card>
  );
};

export default SidebarTags;
