// app/components/HelloButton.tsx
'use client';

import { useTransition, useState } from 'react';
import { sayHello } from '@/app/(homepage)/_actions/poke';

export const Poke = ({ ip }: { ip: string }) => {
  const [message, setMessage] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      const result = await sayHello(ip);
      setMessage(result);
      setTimeout(() => setMessage(''), 5000);
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        right: 0,
        bottom: 0,
        zIndex: 999999,
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }}
    >
      {message && <p style={{ color: 'white', fontWeight: 600 }}>{message}</p>}
      <button
        onClick={handleClick}
        disabled={isPending}
        style={{
          marginLeft: 'auto',
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          backgroundColor: isPending ? '#a0c4ff' : '#0070f3',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: isPending ? 'not-allowed' : 'pointer',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          transition: 'background-color 0.3s ease, transform 0.2s ease',
          transform: isPending ? 'scale(0.98)' : 'scale(1)'
        }}
      >
        {isPending ? 'Saying hello...' : 'Say Hello'}
      </button>
    </div>
  );
};
