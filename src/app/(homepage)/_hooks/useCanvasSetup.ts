import { useEffect } from 'react';
import { setup } from '@/lib/canvas';

export const useCanvasSetup = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(max-width: 900px)');
      if (!mediaQuery.matches) {
        setup(window);
      }
    }
  }, []);
};
