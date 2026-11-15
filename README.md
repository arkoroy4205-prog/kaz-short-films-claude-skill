# Kaz Short Films — Claude Skill

A Claude Skill project for creating minimalist animated shorts from a creative brief, voice-over audio, and optional SRT subtitles.

## Workflow

1. Upload narration audio and the matching `.srt` subtitle file in Claude.
2. Provide a topic/creative brief and choose **9:16 vertical**, **16:9 landscape**, or both.
3. Develop a scene-by-scene storyboard aligned to narration and subtitle timing.
4. Render the storyboard in the selected aspect ratio(s), after checking renderer support.
5. Optionally post-process the render with `scripts/postprocess.py` to burn SRT captions and/or create a 9:16 centre crop.

## Imported files

- `SKILL.md` — Skill instructions and workflow
- `references/` — story formula, visual style, storyboard schema, film breakdowns
- `examples/` — sample storyboard JSON files
- `scripts/postprocess.py` — SRT burn-in and aspect-ratio post-processing helper
- `LICENSE` — source and third-party material notices

## Still pending

The uploaded archive contains 341 entries. The original renderer (`scripts/render.py`) and Poppins font binaries have not yet been committed to this repository. Third-party reference screenshot frames are intentionally excluded from this public repository.

The original renderer is landscape-first and has voice-over support. The post-processor can burn SRT captions and crop a rendered landscape MP4 to 9:16, but this is a centre crop, not semantic re-composition. Review framing and use `--crop-x` to shift the crop. The full workflow is not runnable from this repository until the original renderer is imported.

## Post-processing examples

```bash
# Burn SRT captions into an existing render
python3 scripts/postprocess.py input.mp4 --srt narration.srt -o captioned.mp4

# Convert a landscape render to a 9:16 centre crop
python3 scripts/postprocess.py input.mp4 --aspect 9:16 -o portrait.mp4

# Crop toward the right side of the source frame
python3 scripts/postprocess.py input.mp4 --aspect 9:16 --crop-x 0.62 -o portrait-right.mp4
```

## File limit

The project is being curated to stay within the requested maximum of 200 files. Unnecessary cache files and the large pre-rendered sample MP4 are excluded.
