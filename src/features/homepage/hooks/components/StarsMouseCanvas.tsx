import { useCanvasSetup } from '../useCanvasSetup';

export const StarsMouseCanvas = () => {
  useCanvasSetup();
  return <canvas id='world' width='383' height='898' />;
};
