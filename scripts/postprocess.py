#!/usr/bin/env python3
"""Post-process a rendered Kaz Short Films MP4.

Adds optional burned-in SRT captions and/or converts a landscape render to a
portrait 9:16 centre crop. This is a post-process helper, not a replacement
for the storyboard renderer. For important subjects, review the crop or set
--crop-x to reposition the source window.

Requires: Python 3.9+ and ffmpeg on PATH.
"""
import argparse
import shutil
import subprocess
from pathlib import Path


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("input", help="Input rendered MP4")
    ap.add_argument("-o", "--out", required=True, help="Output MP4")
    ap.add_argument("--aspect", choices=("16:9", "9:16"), default="16:9")
    ap.add_argument("--srt", help="Optional SRT file to burn into the video")
    ap.add_argument("--crop-x", type=float, default=0.5,
                    help="Portrait crop centre as fraction of source width (0..1); default 0.5")
    ap.add_argument("--height", type=int, default=1280,
                    help="Output height; width is derived from aspect ratio")
    args = ap.parse_args()

    if not shutil.which("ffmpeg"):
        raise SystemExit("Error: ffmpeg was not found on PATH.")
    src = Path(args.input)
    if not src.is_file():
        raise SystemExit(f"Error: input video not found: {src}")
    if args.srt and not Path(args.srt).is_file():
        raise SystemExit(f"Error: SRT file not found: {args.srt}")
    if not 0.0 <= args.crop_x <= 1.0:
        raise SystemExit("Error: --crop-x must be between 0 and 1.")
    if args.height < 180:
        raise SystemExit("Error: --height must be at least 180.")

    filters = []
    if args.aspect == "9:16":
        out_w = round(args.height * 9 / 16)
        filters.append(
            f"scale=-2:{args.height},"
            f"crop={out_w}:{args.height}:"
            f"(iw-{out_w})*{args.crop_x:.6f}:0"
        )
    else:
        out_w = round(args.height * 16 / 9)
        filters.append(f"scale={out_w}:{args.height}")

    if args.srt:
        srt_path = str(Path(args.srt).resolve()).replace("\\", "/")
        srt_path = srt_path.replace(":", "\\:").replace("'", "\\'")
        filters.append(f"subtitles='{srt_path}'")

    cmd = ["ffmpeg", "-y", "-i", str(src), "-vf", ",".join(filters),
           "-c:v", "libx264", "-preset", "medium", "-crf", "20",
           "-c:a", "copy", str(args.out)]
    subprocess.run(cmd, check=True)
    print(f"Created: {args.out} ({args.aspect})")


if __name__ == "__main__":
    main()
