'use client';

import { useState, useEffect } from 'react';
import { AutoplayVideo } from './AutoplayVideo';
import { Transformation } from '@/lib/imagekit';

// Types
interface VideoMetrics {
  size: number | null;
  loadTime: number | null;
  format: string | null;
}

interface VideoCardProps {
  title: string;
  label: string;
  url: string;
  path: string;
  transformation?: Transformation;
  isOptimized: boolean;
}

interface OptimizationComparisonProps {
  originalUrl: string;
  optimizedUrl: string;
  originalPath: string;
  optimizedPath: string;
  originalTransformation?: Transformation;
  optimizedTransformation?: Transformation;
}

// Sub-Components
function VideoCard({
  title,
  label,
  url,
  path,
  transformation,
  isOptimized,
}: VideoCardProps) {
  const [metrics, setMetrics] = useState<VideoMetrics>({
    size: null,
    loadTime: null,
    format: null,
  });

  useEffect(() => {
    const startTime = performance.now();
    fetch(url, { method: 'HEAD' })
      .then((response) => {
        const contentLength = response.headers.get('content-length');
        const contentType = response.headers.get('content-type');
        setMetrics({
          size: contentLength ? parseInt(contentLength) / 1024 / 1024 : null,
          loadTime: performance.now() - startTime,
          format: contentType?.split('/')[1] || null,
        });
      })
      .catch(() => {});
  }, [url]);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
          isOptimized 
            ? 'bg-emerald-50 text-emerald-700' 
            : 'bg-gray-100 text-gray-600'
        }`}>
          {label}
        </span>
      </div>

      {/* Video */}
      <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4">
        <AutoplayVideo 
          path={path} 
          transformation={transformation}
          className="w-full h-full" 
        />
      </div>

      {/* Metrics */}
      <div className="flex gap-6 text-sm">
        {metrics.size !== null && (
          <div>
            <span className="text-gray-400">Size</span>
            <p className={`font-semibold ${isOptimized ? 'text-emerald-600' : 'text-gray-900'}`}>
              {metrics.size.toFixed(2)} MB
            </p>
          </div>
        )}
        {metrics.format && (
          <div>
            <span className="text-gray-400">Format</span>
            <p className="font-semibold text-gray-900 uppercase">{metrics.format}</p>
          </div>
        )}
        {metrics.loadTime !== null && (
          <div>
            <span className="text-gray-400">Response</span>
            <p className="font-semibold text-gray-900">{metrics.loadTime.toFixed(0)}ms</p>
          </div>
        )}
      </div>
    </div>
  );
}

function SavingsBadge({ originalUrl, optimizedUrl }: { originalUrl: string; optimizedUrl: string }) {
  const [savings, setSavings] = useState<number | null>(null);

  useEffect(() => {
    Promise.all([
      fetch(originalUrl, { method: 'HEAD' })
        .then((res) => parseInt(res.headers.get('content-length') || '0') / 1024 / 1024)
        .catch(() => 0),
      fetch(optimizedUrl, { method: 'HEAD' })
        .then((res) => parseInt(res.headers.get('content-length') || '0') / 1024 / 1024)
        .catch(() => 0),
    ]).then(([orig, opt]) => {
      if (orig > opt && opt > 0) {
        setSavings(((orig - opt) / orig) * 100);
      }
    });
  }, [originalUrl, optimizedUrl]);

  if (!savings) return null;

  return (
    <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
      {savings.toFixed(0)}% smaller
    </div>
  );
}

// Main Component
export function OptimizationComparison({
  originalUrl,
  optimizedUrl,
  originalPath,
  optimizedPath,
  originalTransformation,
  optimizedTransformation,
}: OptimizationComparisonProps) {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-4 mb-3">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Optimization Comparison
            </h2>
            <SavingsBadge originalUrl={originalUrl} optimizedUrl={optimizedUrl} />
          </div>
          <p className="text-gray-500 max-w-2xl">
            Same video, different delivery. ImageKit transforms and compresses 
            on-the-fly using URL parameters.
          </p>
        </div>

        {/* Side-by-Side Videos */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <VideoCard
            title="Original"
            label="Unoptimized"
            url={originalUrl}
            path={originalPath}
            transformation={originalTransformation}
            isOptimized={false}
          />
          <VideoCard
            title="Optimized"
            label="ImageKit"
            url={optimizedUrl}
            path={optimizedPath}
            transformation={optimizedTransformation}
            isOptimized={true}
          />
        </div>

        {/* URL Comparison */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">How it works</h3>
          <div className="space-y-3">
            <div>
              <span className="text-xs text-gray-400 uppercase tracking-wide">Original URL</span>
              <code className="block mt-1 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg overflow-x-auto">
                {originalUrl}
              </code>
            </div>
            <div>
              <span className="text-xs text-gray-400 uppercase tracking-wide">Optimized URL</span>
              <code className="block mt-1 text-sm text-emerald-700 bg-emerald-50 p-3 rounded-lg overflow-x-auto">
                {optimizedUrl}
              </code>
            </div>
          </div>
          
          {/* Parameters */}
          <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap gap-3">
            <code className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full">
              w-1280 <span className="text-gray-400">resize</span>
            </code>
            <code className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full">
              q-50 <span className="text-gray-400">quality</span>
            </code>
            <code className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full">
              ac-none <span className="text-gray-400">no audio</span>
            </code>
          </div>
        </div>
      </div>
    </section>
  );
}
