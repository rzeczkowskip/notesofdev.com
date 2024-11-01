import { Renderer } from '../types';
import cn from '@/utils/cn';

const List: Renderer<{ listType?: 'bullet' | 'number' | 'check' }> = ({
  data,
  className,
  ...props
}) => {
  const ListTag = data.node?.listType === 'number' ? 'ol' : 'ul';
  const listTypeClass =
    data.node.listType === 'check' ? 'list-none list-check' : null;

  return <ListTag {...props} className={cn(className, listTypeClass)} />;
};

export default List;
