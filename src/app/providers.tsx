'use client';

import { ImageKitProvider } from '@imagekit/next';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ImageKitProvider
      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}
      transformationPosition="query"
    >
      {children}
    </ImageKitProvider>
  );
}
