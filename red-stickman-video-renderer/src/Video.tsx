import React, {useMemo} from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig, interpolate, spring} from 'remotion';

type Props = {audioSrc: string; srtSrc: string};
type Cue = {start: number; end: number; text: string};

const RED = '#FF1E2D';
const WHITE = '#F5F5F5';

const parseSrt = (raw: string): Cue[] => raw.trim().split(/\r?\n\s*\r?\n/).map((block) => {
  const lines = block.split(/\r?\n/);
  const time = lines.find((line) => line.includes('-->'));
  if (!time) return null;
  const [a, b] = time.split('-->').map((v) => v.trim().split(',').join('.'));
  const seconds = (v: string) => {
    const [h, m, s] = v.split(':');
    return Number(h) * 3600 + Number(m) * 60 + Number(s);
  };
  return {start: seconds(a), end: seconds(b), text: lines.slice(lines.indexOf(time) + 1).join(' ').replace(/<[^>]+>/g, '')};
}).filter((x): x is Cue => Boolean(x && x.text));

const Stickman: React.FC<{scale?: number; mood?: 'idle'|'walk'|'reach'}> = ({scale = 1, mood = 'idle'}) => {
  const frame = useCurrentFrame();
  const bob = mood === 'walk' ? Math.sin(frame / 5) * 9 : Math.sin(frame / 18) * 3;
  const arm = mood === 'reach' ? -35 : Math.sin(frame / 10) * 12;
  return <svg width={260 * scale} height={440 * scale} viewBox="0 0 260 440">
    <g fill="none" stroke={WHITE} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" transform={`translate(0 ${bob})`}>
      <circle cx="130" cy="62" r="39" />
      <path d="M130 103 L130 255" />
      <path d={`M130 145 L${75 + arm} 215 M130 145 L${185 - arm} 205`} />
      <path d={mood === 'walk' ? 'M130 255 L75 340 L45 410 M130 255 L185 330 L215 405' : 'M130 255 L82 350 L65 420 M130 255 L178 350 L195 420'} />
    </g>
  </svg>;
};

const sceneFor = (text: string): {label: string; mood: 'idle'|'walk'|'reach'; symbol: string} => {
  const t = text.toLowerCase();
  if (/goal|dream|future|success|achieve|vision/.test(t)) return {label: 'KEEP MOVING FORWARD', mood: 'reach', symbol: '↑'};
  if (/fear|doubt|anxious|worry|scared/.test(t)) return {label: 'FACE THE FEAR', mood: 'idle', symbol: '◈'};
  if (/time|today|tomorrow|moment|minute/.test(t)) return {label: 'YOUR TIME MATTERS', mood: 'walk', symbol: '◷'};
  if (/habit|discipline|consistent|routine|practice/.test(t)) return {label: 'SMALL STEPS. EVERY DAY.', mood: 'walk', symbol: '▤'};
  if (/choice|choose|decision|change/.test(t)) return {label: 'CHOOSE YOUR DIRECTION', mood: 'reach', symbol: '↗'};
  if (/pain|hard|struggle|fail|setback/.test(t)) return {label: 'GROW THROUGH IT', mood: 'idle', symbol: '✳'};
  return {label: 'ONE STEP AT A TIME', mood: 'walk', symbol: '•'};
};

const Scene: React.FC<{cue: Cue; index: number}> = ({cue, index}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const local = frame;
  const enter = spring({frame: local, fps, config: {damping: 18, stiffness: 90}});
  const data = sceneFor(cue.text);
  const opacity = interpolate(local, [0, 12, Math.max(13, (cue.end-cue.start)*fps-10), Math.max(14, (cue.end-cue.start)*fps)], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{backgroundColor: '#050505', opacity, justifyContent: 'center', alignItems: 'center'}}>
    <div style={{position: 'absolute', top: 170, color: RED, fontSize: 30, letterSpacing: 9, fontWeight: 800}}>LIFE LESSONS / {String(index + 1).padStart(2, '0')}</div>
    <div style={{position: 'absolute', top: 340, color: RED, fontSize: 150, fontWeight: 900, opacity: 0.9, transform: `scale(${0.8 + enter * 0.2})`}}>{data.symbol}</div>
    <div style={{transform: `translateY(${(1-enter)*80}px)`}}><Stickman mood={data.mood} scale={1.1}/></div>
    <div style={{position: 'absolute', bottom: 520, width: '82%', textAlign: 'center', color: WHITE, fontSize: 58, fontWeight: 900, letterSpacing: 1, lineHeight: 1.15}}>{data.label.split(' ').map((word, i) => <span key={i} style={{color: i === 1 ? RED : WHITE}}>{word} </span>)}</div>
    <div style={{position: 'absolute', bottom: 300, width: '84%', textAlign: 'center', color: WHITE, fontSize: 40, lineHeight: 1.25, fontWeight: 600, textShadow: '0 3px 16px #000'}}>{cue.text}</div>
    <div style={{position: 'absolute', bottom: 120, width: '80%', height: 5, background: '#333'}}><div style={{height: '100%', width: `${Math.min(100, frame / Math.max(1, (cue.end-cue.start)*fps) * 100)}%`, background: RED}} /></div>
  </AbsoluteFill>;
};

export const MotivationalVideo: React.FC<Props> = ({audioSrc, srtSrc}) => {
  // SRT is parsed by the build helper and emitted as public/cues.json.
  // Keeping this fallback makes the template previewable before subtitle import.
  const cues: Cue[] = useMemo(() => [
    {start: 0, end: 6, text: 'Your next chapter starts with one decision.'},
    {start: 6, end: 12, text: 'Keep showing up, even when progress feels slow.'},
    {start: 12, end: 18, text: 'Small actions create lasting change.'}
  ], []);
  const {fps, durationInFrames} = useVideoConfig();
  return <AbsoluteFill style={{backgroundColor: '#050505'}}>
    {cues.map((cue, i) => {
      const from = Math.round(cue.start * fps);
      const duration = Math.max(1, Math.min(durationInFrames - from, Math.round((cue.end - cue.start) * fps)));
      return <Sequence key={i} from={from} durationInFrames={duration}><Scene cue={cue} index={i}/></Sequence>;
    })}
    <Audio src={staticFile('voiceover.mp3')} volume={1}/>
  </AbsoluteFill>;
};
