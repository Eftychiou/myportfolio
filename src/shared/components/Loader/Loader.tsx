'use client';
import { useFormStatus } from 'react-dom';
import styles from './Loader.module.scss'; // or wherever you place it
import { SpinnerWithBackdrop } from './SpinnerWithBackdrop';

export const Loader = () => {
  const { pending } = useFormStatus();

  if (!pending) return null;

  return <SpinnerWithBackdrop />;
};
