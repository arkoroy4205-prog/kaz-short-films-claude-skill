# Red Stickman Motivational Video Renderer

A code-first Remotion template for 9:16 motivational / self-improvement videos.

## Visual direction
- 1080x1920, 30 fps, black background
- White minimalist stick figure
- Bright red accent: #FF1E2D
- English kinetic captions and symbolic visual motifs
- User's own voice-over remains the master audio track

## Local setup
1. Install Node.js 20+ and FFmpeg.
2. Run `npm install`.
3. Put your narration at `public/voiceover.mp3`.
4. Put your subtitle file at `public/subtitles.srt`.
5. Run `npm run preview` or `npm run render`.

## Important current template limitation
The initial composition contains sample cue data so it can be previewed immediately. Before rendering the user's actual video, parse `public/subtitles.srt` into cue data and replace the sample cue array in `src/Video.tsx`. The narration asset is intentionally not committed to this public repository.

## Render
`npx remotion render src/index.ts MotivationalVideo out/video.mp4`
