---
name: kaz-short-films
description: Create minimalist animated inner-enemy short films from a creative brief, voice-over audio, and optional SRT subtitles. Supports planning for 9:16 vertical and 16:9 landscape outputs.
---

# Kaz Short Films

Create 1.5–4 minute animated shorts in a minimalist inner-enemy style: a cream pictogram hero, a dark shadow antagonist, day counters, escalating whispers, a fall → turn → climb arc, and a concise title card.

## Required project references

Read these before creating a storyboard:
- `references/story-formula.md`
- `references/style-bible.md`
- `references/film-breakdowns.md`
- `references/storyboard-schema.md`

## Intake

When a user uploads narration audio and/or an SRT:
1. Identify the supplied files and their formats.
2. Ask for the topic/niche only if it is not clear from the prompt.
3. Ask which output aspect ratio is wanted: **9:16**, **16:9**, or **both**.
4. Treat the supplied narration and subtitle text as source material. Do not invent or rewrite spoken words unless asked.
5. If both audio and SRT are supplied, preserve subtitle wording and timing. Flag obvious timing or duration mismatches rather than silently changing them.

If the user gives no preferences, use a concise 9:16 social-video brief and state the assumption.

## Story development

Use the seven-beat structure in `references/story-formula.md`. Create a scene-by-scene storyboard with scene duration, visual set, hero pose and mood, shadow position and whisper, captions, day labels, props, palette, sound cues, and narration/SRT timing references when supplied.

Keep one idea per scene. Build a visual bookend by returning to the opening anchor at the end. The shadow should become smaller, not disappear: the habit is managed, not magically erased.

## Aspect ratio

- **16:9:** compose for a 1280×720 design frame.
- **9:16:** compose for a portrait frame; recompose key subjects and typography rather than assuming a landscape frame will crop safely.
- **Both:** create two storyboard/render variants and check text placement independently.

Keep titles, faces, captions, and key props within the target frame's safe area.

## Voice-over and subtitles

- Match scene durations to the supplied narration and SRT timestamps.
- Keep subtitle wording unchanged unless the user explicitly requests editing.
- Do not let scene cuts interrupt a spoken phrase unnecessarily.
- If narration and SRT disagree, report the mismatch and ask which source should govern.
- Voice-over should remain intelligible over the score; lower the music beneath narration.

## Quality control

Check story structure, whisper escalation, caption readability, narration timing, aspect ratio, and the opening/ending bookend. Do not copy exact scripts, titles, or characters from reference films.

Deliver storyboard JSON and rendered video when the rendering environment and required assets are available. Be explicit about missing renderer capability; never claim an output was rendered if it was not.
