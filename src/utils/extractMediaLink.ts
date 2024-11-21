import { Media } from '@/payload/payload-types';

type ImageMediaProps = {
  src: string;
  width: number | undefined;
  height: number | undefined;
};

const extractImageMediaProps = (
  media?: Media | null,
  size?: keyof NonNullable<Media['sizes']>,
): ImageMediaProps | undefined => {
  const mediaDetails = (size && media?.sizes?.[size]) || media;

  if (
    !mediaDetails ||
    !mediaDetails.url ||
    !mediaDetails.mimeType?.startsWith('image/')
  ) {
    return undefined;
  }

  return {
    src: `${mediaDetails.url}?t=${new Date(media.updatedAt).getTime()}`,
    width: mediaDetails.width || undefined,
    height: mediaDetails.height || undefined,
  };
};

export default extractImageMediaProps;
