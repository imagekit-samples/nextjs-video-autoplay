# Next.js Video Autoplay Demo

A Next.js demo showing production-ready autoplay video components that work across all modern browsers. Uses ImageKit for video optimization.

## What it does

- Autoplay videos with three simple attributes: `autoPlay`, `muted`, `playsInline`
- Uses `playsInline` to prevent iOS fullscreen hijacking
- Plays videos on scroll, pauses when hidden
- Reduces 64MB videos to under 1MB with ImageKit transformations

## Quickstart

```bash
git clone https://github.com/gitpichardo/nextjs-video-autoplay.git
cd nextjs-video-autoplay
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You'll see three demo patterns: 
- Hero background video
- Scroll-triggered video playback
- Before/after optimization comparison

## Use your own ImageKit account

To use your own videos and account:

1. [Sign up for ImageKit for free](https://imagekit.io/registration)
2. Create `.env.local` in the project root:

```
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/YOUR_IMAGEKIT_ID
```

3. Update `DEMO_VIDEO_PATH` in `lib/imagekit.ts` to point to your video.

## Transformations

| Parameter | Effect |
| --- | --- |
| `w-1280` | Resize to 1280px width |
| `q-50` | 50% quality |
| `ac-none` | Strip audio (required for autoplay) |

## Notes

- All videos use the `ac-none` transformation to strip audio tracks. This guarantees browsers treat the video as silent.
- The `ScrollVideo` component uses `buildSrc` with a native `<video>` element to enable play/pause control via refs.
- The `AutoplayVideo` component uses the simple `autoPlay` attribute—no JavaScript required for basic playback.

## About

This repository accompanies the blog post: [How to Autoplay Video in Next.js](https://imagekit.io/blog/nextjs-video-autoplay/)
