'use client';

import { useState, useEffect } from 'react';

const sendConsentToGA = (status: 'granted' | 'denied') => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('consent', 'update', {
      'analytics_storage': status
    });
  }
};

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    } else if (consent === 'accepted') {
      sendConsentToGA('granted');
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    sendConsentToGA('granted');
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined');
    sendConsentToGA('denied');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:max-w-sm z-[9999] p-6 bg-white border border-gray-200 rounded-2xl shadow-2xl">
      <div className="flex flex-col gap-4">
        <h3 className="font-bold text-gray-900">Ochrana soukromí 🍪</h3>
        <p className="text-sm text-gray-600">
          Pomozte nám zlepšovat web. Analytické cookies nám řeknou, co vás zajímá, ale motor vám vyčistíme i bez nich.
        </p>
        <div className="flex gap-2">
          <button
            onClick={acceptCookies}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
          >
            Přijmout vše
          </button>
          <button
            onClick={declineCookies}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors text-sm"
          >
            Odmítnout
          </button>
        </div>
      </div>
    </div>
  );
}