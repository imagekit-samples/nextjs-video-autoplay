'use client';

import { useRef, useEffect, useState } from 'react';
import { buildSrc } from '@imagekit/next';
import { useInView } from 'react-intersection-observer';

interface ScrollVideoProps {
  path: string;
  transformation?: Array<Record<string, string | number>>;
  posterTime?: number;
  className?: string;
  threshold?: number;
}

export function ScrollVideo({
  path,
  transformation = [{ width: 1280, quality: 50, audioCodec: 'none' }],
  posterTime = 1,
  className = '',
  threshold = 0.5,
}: ScrollVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { ref: containerRef, inView } = useInView({ threshold });
  const [isBlocked, setIsBlocked] = useState(false);

  const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!;

  const src = buildSrc({ urlEndpoint, src: path, transformation });
  
  const poster = buildSrc({
    urlEndpoint,
    src: `${path}/ik-thumbnail.jpg`,
    transformation: [{ width: 1280, startOffset: posterTime }],
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

  if (isBlocked) {
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
