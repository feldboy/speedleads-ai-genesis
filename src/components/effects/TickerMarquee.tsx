import React from 'react';

const ITEMS = [
  'בוטים חכמים',
  'AUTOMATION',
  'מערכות CRM',
  'AI INTEGRATIONS',
  'אתרים שמוכרים',
  'LIVE 24/7',
  'דפי נחיתה',
  'E-COMMERCE',
];

/** Infinite champagne ticker band — the luxury "stock exchange" strip. */
const TickerMarquee = () => {
  const half = (key: string) => (
    <div key={key} className="flex shrink-0 items-center" aria-hidden={key === 'b'}>
      {ITEMS.map((item) => (
        <span key={`${key}-${item}`} className="flex items-center">
          <span className="font-tech text-sm tracking-[0.3em] text-ivory/45 uppercase whitespace-nowrap px-8">
            {item}
          </span>
          <span className="text-champagne text-[0.6rem]" aria-hidden="true">◆</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="relative py-6 overflow-hidden select-none" dir="ltr">
      <div className="hairline-gold absolute top-0 left-0 right-0" />
      <div className="marquee-track">
        {half('a')}
        {half('b')}
      </div>
      <div className="hairline-gold absolute bottom-0 left-0 right-0" />
      {/* edge fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-obsidian to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-obsidian to-transparent" />
    </div>
  );
};

export default TickerMarquee;
