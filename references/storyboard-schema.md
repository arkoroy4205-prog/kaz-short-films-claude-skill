# Storyboard schema

The source renderer uses a 1280×720 design space. Confirm the renderer's current capabilities before relying on fields or command-line options.

## Top-level structure

```json
{ "title": "...", "scenes": [ { "scene": "..." } ] }
```

## Scene fields

| Field | Type | Meaning |
|---|---|---|
| `duration` | number | Scene duration in seconds; required |
| `set` | string | bedroom, couch, desk, mirror, gym, city, stairs, hill, street_rain, clock_closeup, spotlight, empty, black, title, graph |
| `palette` | string | night, cold, dawn, sunset, warm, day, rain, home, black |
| `day`, `day_big` | string / bool | Day label; big enables a centred label |
| `caption`, `caption_pos` | string | Narrator caption and position |
| `whisper`, `whisper_xy`, `whisper_size` | string / array / number | Red typewriter text |
| `hero` | object or list | Hero configuration |
| `shadow` | object | x, to_x, scale, behind, eyes, ground |
| `meter` | object | label, from, to |
| `bubble` | object | text, x, y |
| `props` | list | Objects such as window, clock, desk, couch, mirror, bag, sign |
| `clock`, `alarm` | string / bool | Clock display and alarm cue |
| `sky` | string | night, dawn, sunset, day |
| `cracked` | bool | Cracked mirror effect |
| `big_text` | string | Large centred text |
| `rain`, `sparks`, `flash`, `grain` | bool | Visual effects |
| `zoom`, `focus` | number / array | Camera movement and focus |
| `fade_in`, `fade_out` | number | Fade duration |
| `music` | string | dark, tense, warm, hope, silent |
| `sfx` | list | alarm or timed hit, boom, whoosh, alarm |
| `title`, `sub`, `punch` | string | Title-card fields |
| `goal`, `a`, `b` | string | Graph labels |

## Hero fields

- `x`, `to_x`: horizontal position and optional destination
- `pose`: stand, walk, run, lean, sit, slump, lie, curl, pushup, punch, talk
- `arms`: down, crossed, hips, head, scratch, pockets, point, raise, punch, phone
- `mood`: neutral, happy, sad, tired, angry, determined, scared, sleep
- `scale`, `headband`, `phone`, `look`, `aura`, `on_stairs`, `ground`, `color`, `ease`

## Aspect ratio, voice-over, and subtitles

The original renderer in this archive is landscape-first. Do not assume that it supports portrait rendering, direct audio input, or SRT burn-in unless those options are implemented and tested.

For a voice-over workflow, preserve source audio and subtitle files, align scene boundaries with subtitle timing, keep spoken wording unchanged unless editing is requested, and validate final duration and synchronization.

For portrait delivery, use a portrait composition or a tested re-layout pass; a blind crop may cut off captions, characters, and props.
