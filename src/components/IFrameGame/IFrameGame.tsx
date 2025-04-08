import { useState } from 'react';
import classes from './IFrameGame.module.scss';

export const IFrameGame = () => {
  const [show, setShow] = useState(false);
  return (
    <div className={classes.IFrameGame}>
      <div className={classes.toggle} onClick={() => setShow((state) => !state)}>
        Chat
      </div>

      <iframe
        style={{ display: show ? 'block' : 'none' }}
        src={process.env.IFRAME_URL}
        width={process.env.IFRAME_WIDTH}
        height={process.env.IFRAME_HEIGHT}
      />
    </div>
  );
};
