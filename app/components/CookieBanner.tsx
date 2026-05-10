'use client';

import { useState, useEffect } from 'react';

const FONT = "var(--font-dm), 'DM Sans', system-ui, sans-serif";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('cookie-seen');
    if (!seen) setIsVisible(true);
  }, []);

  const dismiss = () => {
    localStorage.setItem('cookie-seen', '1');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
      background: '#1a1a1a',
      borderTop: '3px solid #ff5500',
      fontFamily: FONT,
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        flexWrap: 'wrap',
      }}>
        <p style={{
          margin: 0,
          flex: 1,
          minWidth: '220px',
          fontSize: '0.9rem',
          color: 'rgba(255,255,255,0.75)',
          lineHeight: 1.5,
        }}>
          🍪 Používáme analytické cookies ke zlepšení webu.
        </p>
        <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
          <button
            onClick={dismiss}
            style={{
              fontFamily: FONT,
              fontSize: '0.85rem',
              fontWeight: 600,
              padding: '9px 18px',
              border: '1px solid #444',
              background: 'transparent',
              color: '#aaa',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { (e.target as HTMLButtonElement).style.borderColor = '#888'; (e.target as HTMLButtonElement).style.color = '#fff'; }}
            onMouseLeave={e => { (e.target as HTMLButtonElement).style.borderColor = '#444'; (e.target as HTMLButtonElement).style.color = '#aaa'; }}
          >
            Odmítnout
          </button>
          <button
            onClick={dismiss}
            style={{
              fontFamily: FONT,
              fontSize: '0.85rem',
              fontWeight: 700,
              padding: '9px 20px',
              border: 'none',
              background: '#ff5500',
              color: '#fff',
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => (e.target as HTMLButtonElement).style.background = '#d94700'}
            onMouseLeave={e => (e.target as HTMLButtonElement).style.background = '#ff5500'}
          >
            Přijmout
          </button>
        </div>
      </div>
    </div>
  );
}
