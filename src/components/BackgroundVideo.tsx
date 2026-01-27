'use client';

import { AutoplayVideo } from './AutoplayVideo';

interface BackgroundVideoProps {
  path: string;
  transformation?: Array<Record<string, string | number>>;
  children: React.ReactNode;
}

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
