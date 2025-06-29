'use client';

import { signOut } from 'next-auth/react';
import { useState } from 'react';

export default function SignOutButton() {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyle: React.CSSProperties = {
    marginTop: 20,
    padding: '10px 20px',
    fontSize: 16,
    fontWeight: 600,
    color: '#fff',
    backgroundColor: isHovered ? '#d32f2f' : '#f44336',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.2s, transform 0.1s'
  };

  return (
    <button
      style={baseStyle}
      onClick={() => signOut()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      Sign Out
    </button>
  );
}
