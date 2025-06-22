// This affects only the initial loading and when using Link
import React from 'react';

export default function Loading() {
  return (
    <div style={styles.backdrop}>
      <div style={styles.spinner}></div>
      <p style={styles.text}>Loading...</p>
    </div>
  );
}

const styles = {
  backdrop: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#7D5F6E' // light gray
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '6px solid #ccc',
    borderTop: '6px solid #3b82f6', // blue
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  text: {
    marginTop: '16px',
    fontSize: '18px',
    color: '#333'
  }
} as const;
