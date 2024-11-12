import { InformationCircleIcon } from '@heroicons/react/24/outline';
import Prose from '@/components/Prose';
import RichText from '@/components/RichText/RichText';
import { CalloutBlock } from '@/payload/payload-types';
import cn from '@/utils/cn';

type CalloutProps = {
  block: CalloutBlock;
};

const Callout = ({ block: { content, type = 'info' } }: CalloutProps) => {
  if (!content) {
    return null;
  }

  return (
    <Prose
      small
      className={cn(
        'px-5 border-b-2 rounded flex gap-5',
        type === 'info' && 'bg-info-2 border-info-8 text-info-12',
      )}
    >
      <div className="my-5">
        <InformationCircleIcon className="h-7 w-7 stroke-current" />
      </div>
      <div className="my-auto">
        <RichText content={content} />
      </div>
    </Prose>
  );
};

export default Callout;
