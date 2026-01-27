'use client';

import { Video } from '@imagekit/next';
import { Transformation } from '@/lib/imagekit';

interface AutoplayVideoProps {
  path: string;
  transformation?: Transformation;
  poster?: string;
  className?: string;
}

/**
 * Simple autoplay video component using native autoPlay attribute.
 * 
 * For basic autoplay, no refs are needed - just use autoPlay + muted + playsInline.
 * Modern browsers (Chrome, Safari, Firefox) all support this pattern.
 */
export function AutoplayVideo({
  path,
  transformation = [{ width: 1280, quality: 50, raw: 'ac-none' }],
  poster,
  className = '',
}: AutoplayVideoProps) {
  return (
    <Video
      src={path}
      transformation={transformation}
      autoPlay
      muted
      playsInline
      loop
      poster={poster}
      preload="auto"
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
