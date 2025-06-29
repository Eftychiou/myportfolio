'use client';

import Link from 'next/link';

export default function AuthErrorPage() {
  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '100px auto',
        padding: '2rem',
        textAlign: 'center',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
      }}
    >
      <h1 style={{ color: '#e74c3c' }}>Access Denied</h1>
      <p style={{ marginTop: '1rem', fontSize: '1.1rem' }}>You are not eligible to sign in with this application.</p>
      <Link
        href='/'
        style={{
          display: 'inline-block',
          marginTop: '2rem',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#3498db',
          color: '#fff',
          borderRadius: '4px',
          textDecoration: 'none'
        }}
      >
        Go to Homepage
      </Link>
    </div>
  );
}
