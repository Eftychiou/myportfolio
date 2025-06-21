import { useEffect, useRef } from 'react';
import classes from '../../../app/(homepage)/home.module.scss'; // Adjust path as needed

export function useEyeMovement() {
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      const leftEye = leftEyeRef.current;
      const rightEye = rightEyeRef.current;

      if (mouseY < screenHeight / 5) {
        leftEye?.classList.remove(classes.isBottom);
        rightEye?.classList.remove(classes.isBottom);
      } else {
        leftEye?.classList.add(classes.isBottom);
        rightEye?.classList.add(classes.isBottom);
      }

      if (mouseX < screenWidth / 1.15) {
        leftEye?.classList.remove(classes.isRight);
        rightEye?.classList.remove(classes.isRight);
      } else {
        leftEye?.classList.add(classes.isRight);
        rightEye?.classList.add(classes.isRight);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return { leftEyeRef, rightEyeRef };
}
