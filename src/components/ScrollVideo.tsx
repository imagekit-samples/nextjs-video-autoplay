'use client';

import { useRef, useEffect, useState } from 'react';
import { buildSrc } from '@imagekit/next';
import { useInView } from 'react-intersection-observer';
import { Transformation, imagekitConfig } from '@/lib/imagekit';

interface ScrollVideoProps {
  path: string;
  transformation?: Transformation;
  poster?: string;
  className?: string;
  threshold?: number;
}

/**
 * Video that plays when scrolled into view and pauses when hidden.
 * 
 * Uses buildSrc + native <video> for ref access since the SDK's Video
 * component doesn't forward refs. This allows play/pause control and
 * seamless resume from the same position.
 */
export function ScrollVideo({
  path,
  transformation = [{ width: 1280, quality: 50, raw: 'ac-none' }],
  poster,
  className = '',
  threshold = 0.5,
}: ScrollVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref: containerRef, inView } = useInView({ threshold });
  const [isBlocked, setIsBlocked] = useState(false);

  const src = buildSrc({
    urlEndpoint: imagekitConfig.urlEndpoint,
    src: path,
    transformation,
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (inView) {
      video.play().catch((error) => {
        console.warn('Autoplay blocked:', error);
        setIsBlocked(true);
      });
    } else {
      video.pause();
    }
  }, [inView]);

  if (isBlocked && poster) {
    return (
      <div className={className}>
        <img src={poster} alt="" className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div ref={containerRef} className={className}>
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        loop
        poster={poster}
        preload="metadata"
        className="h-full w-full object-cover"
      />
    </div>
  );
}
