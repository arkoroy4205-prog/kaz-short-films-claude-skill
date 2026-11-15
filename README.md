# Kaz Short Films — Claude Skill

A Claude Skill project for creating minimalist animated shorts from a creative brief, voice-over audio, and optional SRT subtitles.

## Workflow

1. Upload narration audio and the matching `.srt` subtitle file in Claude.
2. Provide a topic/creative brief and choose **9:16 vertical**, **16:9 landscape**, or both.
3. Develop a scene-by-scene storyboard aligned to narration and subtitle timing.
4. Render the storyboard in the selected aspect ratio(s), after checking renderer support.

## Imported from the supplied archive

- `SKILL.md` — Skill instructions and workflow
- `references/story-formula.md` — seven-beat story structure and niche adaptations
- `references/style-bible.md` — visual language, palette, type, pacing, sound
- `references/storyboard-schema.md` — storyboard field reference and media workflow cautions
- `references/film-breakdowns.md` — summarized breakdown notes for the three reference films
- `examples/the-cost-of-later.json` — sample storyboard
- `examples/pose-gallery.json` — hero pose gallery
- `LICENSE` — source and third-party material notices

## Not yet imported

The uploaded archive contains 341 entries. The Python renderer (`scripts/render.py`), Poppins font binaries, and reference screenshot frames have not yet been committed to this repository. The reference screenshots are third-party film frames and are intentionally excluded from this public repository.

The renderer in the source archive is landscape-first and has voice-over support; it does not natively implement the requested SRT burn-in or 9:16 output options. Those capabilities must be implemented and tested before claiming that the Skill can directly render both formats or burn subtitles.

## Planned structure

- `scripts/render.py` — original rendering script (pending import)
- `assets/fonts/` — licensed Poppins font files (pending import)
- `reference_screenshots/` — excluded third-party study images

## File limit

The project is being curated to stay within the requested maximum of 200 files. Unnecessary cache files and the large pre-rendered sample MP4 are excluded.
