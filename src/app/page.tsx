'use client';

import { BackgroundVideo } from '@/components/BackgroundVideo';
import { ScrollVideo } from '@/components/ScrollVideo';
import { OptimizationComparison } from '@/components/OptimizationComparison';
import { DEMO_VIDEO_PATH, TRANSFORMATIONS, buildImageKitUrl } from '@/lib/imagekit';

export default function Home() {
  const originalUrl = buildImageKitUrl(DEMO_VIDEO_PATH, TRANSFORMATIONS.original);
  const optimizedUrl = buildImageKitUrl(DEMO_VIDEO_PATH, TRANSFORMATIONS.optimized);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <BackgroundVideo 
        path={DEMO_VIDEO_PATH}
        transformation={TRANSFORMATIONS.optimized}
      >
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">
            Next.js Video Autoplay
          </h1>
          <p className="text-lg md:text-xl opacity-80 max-w-xl mx-auto font-light">
            Production-ready, optimized, autoplay components for Next.js
          </p>
        </div>
      </BackgroundVideo>

      {/* Scroll-Triggered Video */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
            Scroll-Triggered Playback
          </h2>
          <p className="text-gray-500 max-w-2xl">
            This video plays when scrolled into view and pauses when hidden.
            It resumes from where it left off, not from the beginning.
          </p>
        </div>
        
        <ScrollVideo
          path={DEMO_VIDEO_PATH}
          transformation={TRANSFORMATIONS.optimized}
          threshold={0.5}
          className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl"
        />
        
        <p className="text-sm text-gray-400 mt-4">
          Using <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">buildSrc</code> + native{' '}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">&lt;video&gt;</code> for ref access.
        </p>
      </section>

      {/* Optimization Comparison */}
      <OptimizationComparison
        originalUrl={originalUrl}
        optimizedUrl={optimizedUrl}
        originalPath={DEMO_VIDEO_PATH}
        optimizedPath={DEMO_VIDEO_PATH}
        originalTransformation={TRANSFORMATIONS.original}
        optimizedTransformation={TRANSFORMATIONS.optimized}
      />

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-100">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-gray-400 text-sm">
            Built with Next.js and{' '}
            <a
              href="https://imagekit.io"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              ImageKit
            </a>
            {' · '}
            <a
              href="https://github.com/gitpichardo/nextjs-video-autoplay"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
