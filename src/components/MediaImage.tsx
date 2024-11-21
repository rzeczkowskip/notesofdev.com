import Image, { ImageProps } from 'next/image';
import { Media } from '@/payload/payload-types';
import extractImageMediaProps from '@/utils/extractMediaLink';

type MediaImageProps = Omit<ImageProps, 'src' | 'width' | 'height'> & {
  media: Media;
  mediaSize?: keyof NonNullable<Media['sizes']>;
};

const MediaImage = ({ media, mediaSize, ...props }: MediaImageProps) => {
  const mediaProps = extractImageMediaProps(media, mediaSize);

  if (!mediaProps) {
    return null;
  }

  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} {...mediaProps} />;
};

export default MediaImage;
