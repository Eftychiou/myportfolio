'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import styles from './_styles/error.module.scss';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('Global error caught:', error);
  }, [error]);

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Something went wrong</h1>
        <p className={styles.message}>An unexpected error occurred. Please try again later.</p>
        <p className={styles.message}>{error.message}</p>
        <div className={styles.actions}>
          <button onClick={reset} className={styles.button}>
            Try Again
          </button>

          <Link href='/' className={styles.link}>
            Go to Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
