/**
 * ImageKit configuration and transformation utilities
 */

// Type Exports
export type Transformation = Array<Record<string, string | number>>;

// Configuration
export const imagekitConfig = {
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || 'https://ik.imagekit.io/gqcbm9jfq',
};

// Demo Video
export const DEMO_VIDEO_PATH = '/12221555_3840_2160_30fps.mp4';

// Transformation Presets
export const TRANSFORMATIONS: Record<string, Transformation> = {
  /** Web-optimized: 1280px, 50% quality, no audio */
  optimized: [{ width: 1280, quality: 50, audioCodec: 'none' }],
  
  /** Original quality (bypass optimization) */
  original: [{ raw: 'orig-true' }],
  
  /** Mobile: 720px, 50% quality, no audio */
  mobile: [{ width: 720, quality: 50, audioCodec: 'none' }],
};

// Utility Functions

/**
 * Get the auto-generated thumbnail path for a video
 */
export function getThumbnailPath(videoPath: string): string {
  return `${videoPath}/ik-thumbnail.jpg`;
}

/** Maps friendly prop names to ImageKit URL parameter names */
const TRANSFORM_MAP: Record<string, string> = {
  width: 'w',
  height: 'h',
  quality: 'q',
  aspectRatio: 'ar',
  crop: 'c',
  cropMode: 'cm',
  focus: 'fo',
  format: 'f',
  radius: 'r',
  background: 'bg',
  border: 'b',
  rotation: 'rt',
  blur: 'bl',
  dpr: 'dpr',
  audioCodec: 'ac',
  startOffset: 'so',
  duration: 'du',
};

/**
 * Build an ImageKit URL with transformations.
 */
export function buildImageKitUrl(
  path: string,
  transformation?: Transformation
): string {
  const baseUrl = `${imagekitConfig.urlEndpoint}${path}`;
  
  if (!transformation?.length) {
    return baseUrl;
  }
  
  const transformStrings = transformation.map((transform) => {
    return Object.entries(transform)
      .map(([key, value]) => {
        if (key === 'raw') return value;
        const urlKey = TRANSFORM_MAP[key] || key;
        return `${urlKey}-${value}`;
      })
      .join(',');
  });
  
  return `${baseUrl}?tr=${transformStrings.join(':')}`;
}
