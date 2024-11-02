import NextImage from 'next/image';

import Link from 'next/link';
import { LinkField } from '@/payload/custom-types';
import { Media } from '@/payload/payload-types';
import { Renderer } from '@/payload/richText/renderer/types';
import cn from '@/utils/cn';
import extractLinkFieldProps from '@/utils/extractLinkFieldProps';

type UploadExtraProps = {
  relationTo?: string;
  value?: string | Media;
  fields?: {
    link?: LinkField;
    caption?: string;
    alignment?: 'left' | 'center' | 'right';
    enableLink?: boolean;
  };
};

const Image = ({
  value,
  link,
  className,
}: {
  value: Media;
  link?: NonNullable<UploadExtraProps['fields']>['link'];
  className?: string;
}) => {
  const image = (
    <NextImage
      src={value.url!}
      width={value.width || 0}
      height={value.height || 0}
      alt={value.alt || ''}
      className={cn(className, link && 'inline my-0')}
    />
  );

  if (!link) {
    return image;
  }

  return (
    <Link {...extractLinkFieldProps(link)} className="prose-img:my-0">
      {image}
    </Link>
  );
};

const Upload: Renderer<UploadExtraProps> = async ({ data, className }) => {
  const {
    node: { fields, value },
  } = data;

  if (
    !value ||
    typeof value === 'string' ||
    !value.mimeType?.startsWith('image/')
  ) {
    return null;
  }

  const finalClassName = cn(
    className,
    fields?.alignment === 'left' && 'text-left ml-0 mr-auto',
    (!fields?.alignment || fields?.alignment === 'center') &&
      'text-center mx-auto',
    fields?.alignment === 'right' && 'text-right ml-auto mr-0',
  );

  const image = (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      value={value}
      link={fields?.enableLink ? fields.link : undefined}
      className={finalClassName}
    />
  );

  return fields?.caption || value.source ? (
    <figure className={cn(finalClassName)}>
      {image}
      <figcaption>
        {fields?.caption && <div>{fields.caption}</div>}
        {value?.source && <div className="text-xs mt-1">{value.source}</div>}
      </figcaption>
    </figure>
  ) : (
    <p className={finalClassName}>{image}</p>
  );
};

export default Upload;
