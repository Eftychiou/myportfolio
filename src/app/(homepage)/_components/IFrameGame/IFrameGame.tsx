'use client';
import { useEffect, useState } from 'react';
import classes from './IFrameGame.module.scss';

export const IFrameGame = () => {
  const [show, setShow] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [iframeUrl] = useState<string>(process.env.NEXT_PUBLIC_IFRAME_URL!);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 900px)');

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    handleChange(mediaQuery as unknown as MediaQueryListEvent);

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className={classes.IFrameGame} style={{ display: isMobile ? 'none' : 'block' }}>
      <div className={classes.toggle} onClick={() => setShow((state) => !state)}>
        CHAT
      </div>

      <iframe
        className={show ? classes.visible : classes.not_visible}
        // style={{ display: show ? 'block' : 'none' }}
        src={iframeUrl}
        width={800}
        height={600}
      />
    </div>
  );
};
