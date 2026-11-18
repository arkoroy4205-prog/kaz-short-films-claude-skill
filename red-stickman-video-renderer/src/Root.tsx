import React from 'react';
import {Composition} from 'remotion';
import {MotivationalVideo} from './Video';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="MotivationalVideo"
    component={MotivationalVideo}
    durationInFrames={2700}
    fps={30}
    width={1080}
    height={1920}
    defaultProps={{audioSrc: '../public/voiceover.mp3', srtSrc: '../public/subtitles.srt'}}
  />
);
