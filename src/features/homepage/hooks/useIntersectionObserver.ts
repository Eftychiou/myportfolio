// features/home/hooks/useIntersectionObserver.ts
import { useEffect } from 'react';

export const useIntersectionObserver = (
  ref: React.RefObject<Element>,
  callback: () => void,
  options: IntersectionObserverInit = { root: null, rootMargin: '0px', threshold: 0.5 }
) => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback();
        }
      });
    }, options);

    const current = ref.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [ref, callback, options]);
};
