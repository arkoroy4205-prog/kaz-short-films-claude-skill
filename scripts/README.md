# Renderer status and usage

The source archive contains `render.py` (40,891 bytes). It is a Pillow/NumPy frame renderer that shells out to FFmpeg.

## Confirmed source capabilities

- Generates a 1280×720 design-space animation and encodes 16:9 MP4.
- Supports generated ambient score and sound effects.
- Accepts a narration file with `--voice` and mixes it over the score.
- Accepts a replacement music track with `--music`.
- Supports `--res 720|1080`, `--fps`, `--preview`, `--sheet`, and `--only`.

Example command from the source renderer:

```bash
python3 scripts/render.py examples/the-cost-of-later.json -o film.mp4 --res 720 --fps 24 --voice narration.wav
```

Dependencies: Python 3.9+, Pillow, NumPy, and FFmpeg available on PATH.

## Not implemented in the archived renderer

- There is no `--aspect` argument; output is always 16:9.
- There is no SRT input or subtitle burn-in option.
- The renderer does not automatically recompose a landscape storyboard for portrait.

Do not pass `--aspect` or `--srt` to the archived renderer. Those features require code changes and render tests.

## Fonts

The source renderer looks for Poppins font files in `assets/fonts/`; if unavailable, it falls back to DejaVu Sans. The font binaries are third-party assets and should be included only with their licence notice.
