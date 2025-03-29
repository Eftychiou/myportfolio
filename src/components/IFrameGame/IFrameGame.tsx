import { useEffect, useRef } from 'react';

export const IFrameGame = () => {
  const iframeRef = useRef<any>(null);
  console.log('process.env.IFRAMEGAMESERVER', process.env.IFRAMEGAMESERVER);

  return (
    <div style={{ zIndex: 998, position: 'absolute', top: '70px', left: 10, overflow: 'hidden' }}>
      <iframe
        ref={iframeRef}
        src='http://192.168.0.135:3000/game'
        title='Example Iframe'
        width='800'
        height='600'
        style={{ border: 'none', opacity: 0.8, borderRadius: 10 }}
      ></iframe>
    </div>
  );
};
