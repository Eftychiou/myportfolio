'use client';

import { Spinner } from '@/shared/components/Loader/SpinnerWithBackdrop';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginPage() {
  const [hovered, setHovered] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome Back</h1>
        <p style={styles.subtitle}>Please sign in to access the admin panel</p>
        <button
          style={{
            ...styles.button,
            backgroundColor: hovered ? '#357ae8' : '#4285f4'
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => {
            setLoading(true);
            signIn('google', { callbackUrl: '/admin', redirect: true });
          }}
        >
          {loading ? (
            <Spinner />
          ) : (
            <>
              <span style={styles.googleIcon}>🔵</span> Sign in with Google
            </>
          )}
        </button>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  card: {
    maxWidth: 400,
    width: '100%',
    backgroundColor: '#fff',
    padding: '40px 30px',
    borderRadius: 12,
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    textAlign: 'center'
  },
  title: {
    fontSize: 32,
    marginBottom: 10,
    color: '#333'
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: '#666'
  },
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px 20px',
    fontSize: 16,
    fontWeight: 600,
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    transition: 'background-color 0.2s, transform 0.1s',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  },
  googleIcon: {
    marginRight: 8,
    fontSize: 18
  }
};
