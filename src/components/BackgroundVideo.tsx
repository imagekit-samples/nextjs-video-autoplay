'use client';

import { AutoplayVideo } from './AutoplayVideo';
import { Transformation } from '@/lib/imagekit';

interface BackgroundVideoProps {
  path: string;
  transformation?: Transformation;
  children: React.ReactNode;
}

/**
 * Full-screen background video with overlay for hero sections.
 */
export function BackgroundVideo({ path, transformation, children }: BackgroundVideoProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <AutoplayVideo
          path={path}
          transformation={transformation}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute inset-0 z-10 bg-black/50" />
      <div className="relative z-20 h-full flex items-center justify-center">
        {children}
      </div>
    </section>
  );
}
