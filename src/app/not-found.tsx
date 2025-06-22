'use client';

import Link from 'next/link';
import styles from './_styles/not-found.module.scss'; // Import the SCSS file
import { ArrowLeft } from 'lucide-react'; // optional, or just use emoji

export default function NotFound() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.code}>404</h1>
        <h2 className={styles.title}>Page Not Found</h2>
        <p className={styles.message}>Sorry, the page youre looking for doesnt exist or has been moved.</p>
        <Link href='/' className={styles.button}>
          <ArrowLeft size={18} />
          <span>Back to Homepage</span>
        </Link>
      </div>
    </main>
  );
}
