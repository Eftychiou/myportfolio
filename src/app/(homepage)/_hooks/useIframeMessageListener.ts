// features/home/hooks/useIframeMessageListener.ts
import { useEffect, useState } from 'react';

type IframeMessage = {
  type: string;
  playerName: string;
  message: string;
  isCurrentUser: boolean;
};

export const useIframeMessageListener = () => {
  const [latestChatMsg, setLatestChatMsg] = useState('');

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'FROM_IFRAME') {
        const data: IframeMessage = event.data.data;
        if (!data.isCurrentUser) {
          setLatestChatMsg(data.message);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return latestChatMsg;
};
