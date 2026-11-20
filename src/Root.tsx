import './index.css';
import {Composition} from 'remotion';
import {DemoVideo} from './DemoVideo';
import {FullVideo} from './FullVideo';
import {PreviewVideo} from './PreviewVideo';
import {FPS, TOTAL_FRAMES} from './demoPlan';
import {FULL_TOTAL_FRAMES} from './fullPlan';
import {PREVIEW_FPS, PREVIEW_TOTAL_FRAMES} from './preview/previewPlan';
import {W, H} from './lib/tokens';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="Demo"
      component={DemoVideo}
      durationInFrames={TOTAL_FRAMES}
      fps={FPS}
      width={W}
      height={H}
    />
    <Composition
      id="Full"
      component={FullVideo}
      durationInFrames={FULL_TOTAL_FRAMES}
      fps={FPS}
      width={W}
      height={H}
    />
    <Composition
      id="Preview"
      component={PreviewVideo}
      durationInFrames={PREVIEW_TOTAL_FRAMES}
      fps={PREVIEW_FPS}
      width={W}
      height={H}
    />
  </>
);
