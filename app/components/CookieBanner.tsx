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
      background: '#0d3a79',
      borderTop: '3px solid #8cc63f',
      fontFamily: FONT,
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '18px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        flexWrap: 'wrap',
      }}>
        {/* Icon + text */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: '220px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            background: '#8cc63f',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            fontSize: '18px',
          }}>
            🍪
          </div>
          <p style={{
            margin: 0,
            fontSize: '0.85rem',
            color: 'rgba(255,255,255,0.85)',
            lineHeight: 1.5,
            fontWeight: 400,
          }}>
            Používáme analytické cookies ke zlepšení webu.{' '}
            <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.8rem' }}>
              Motor vyčistíme i bez vašeho souhlasu.
            </span>
          </p>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
          <button
            onClick={dismiss}
            style={{
              fontFamily: FONT,
              fontSize: '0.8rem',
              fontWeight: 600,
              padding: '9px 18px',
              border: '1px solid rgba(255,255,255,0.25)',
              background: 'transparent',
              color: 'rgba(255,255,255,0.7)',
              cursor: 'pointer',
              borderRadius: '4px',
              transition: 'all 0.2s',
              letterSpacing: '0.02em',
            }}
            onMouseEnter={e => {
              (e.target as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.5)';
              (e.target as HTMLButtonElement).style.color = '#fff';
            }}
            onMouseLeave={e => {
              (e.target as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.25)';
              (e.target as HTMLButtonElement).style.color = 'rgba(255,255,255,0.7)';
            }}
          >
            Odmítnout
          </button>
          <button
            onClick={dismiss}
            style={{
              fontFamily: FONT,
              fontSize: '0.8rem',
              fontWeight: 600,
              padding: '9px 20px',
              border: 'none',
              background: '#8cc63f',
              color: '#fff',
              cursor: 'pointer',
              borderRadius: '4px',
              transition: 'background 0.2s',
              letterSpacing: '0.02em',
            }}
            onMouseEnter={e => (e.target as HTMLButtonElement).style.background = '#6fa32e'}
            onMouseLeave={e => (e.target as HTMLButtonElement).style.background = '#8cc63f'}
          >
            Přijmout vše
          </button>
        </div>
      </div>
    </div>
  );
}
