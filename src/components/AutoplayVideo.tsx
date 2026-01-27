'use client';

import { Video, buildSrc } from '@imagekit/next';

interface AutoplayVideoProps {
  path: string;
  transformation?: Array<Record<string, string | number>>;
  posterTime?: number;
  className?: string;
}

export function AutoplayVideo({
  path,
  transformation = [{ width: 1280, quality: 50, audioCodec: 'none' }],
  posterTime = 1,
  className = '',
}: AutoplayVideoProps) {
  const poster = buildSrc({
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
    src: `${path}/ik-thumbnail.jpg`,
    transformation: [{ width: 1280, startOffset: posterTime }],
  });

  return (
    <Video
      src={path}
      transformation={transformation}
      autoPlay
      muted
      playsInline
      loop
      poster={poster}
      preload="none"
      className={className}
    />
  );
}
