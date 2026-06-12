import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import MagneticButton from '@/components/effects/MagneticButton';
import { scrollToSection } from '@/lib/scroll';

const Footer = () => {
  return (
    <footer className="relative text-ivory pt-24 pb-10 overflow-hidden">
      <div className="hairline-gold absolute top-0 left-0 right-0" />
      <div className="container mx-auto relative z-10">
        {/* Top: oversized CTA */}
        <div className="asym-grid items-end mb-20 pb-16 border-b border-ivory/10">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="section-index text-champagne">∞ / END</span>
              <span className="h-px w-12 bg-champagne/40" />
              <span className="eyebrow text-ivory/50">Let's build</span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="heading-he display-lg text-ivory"
            >
              נדבר על <br />
              <span className="serif-lux gradient-text">הפרויקט שלך?</span>
            </motion.h2>
          </div>
          <div className="lg:justify-self-end">
            <MagneticButton onClick={() => scrollToSection('contact')}>
              <button
                id="footer_contact_button"
                className="btn-lux px-8 py-4 text-sm tracking-wider"
              >
                דברו איתנו ←
              </button>
            </MagneticButton>
          </div>
        </div>

        {/* Cols */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img src="/speedleads-logo.png" alt="SpeedLeads.AI Logo" className="h-7" />
              <span className="font-tech text-ivory text-base" dir="ltr">
                SPEEDLEADS<span className="text-champagne">.AI</span>
              </span>
            </div>
            <p className="text-ivory/55 leading-relaxed text-sm max-w-xs">
              בוטים, אוטומציות ומערכות CRM מבוססות AI — לעסקים שרוצים להוביל את השוק.
            </p>
            <div className="flex gap-3 mt-6">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((name) => (
                <a
                  key={name}
                  href="#"
                  id={`footer_link_${name}`}
                  className="w-9 h-9 border border-ivory/15 flex items-center justify-center text-ivory/50 hover:text-champagne hover:border-champagne/60 transition-colors duration-300"
                  style={{ borderRadius: '2px' }}
                  aria-label={name}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="eyebrow text-champagne mb-5">Services</div>
            <ul className="space-y-3">
              {[
                'בניית אתרים',
                'דפי נחיתה',
                'חנויות אונליין',
                'אינטגרציות AI',
                'אוטומציות',
              ].map((label) => (
                <li key={label}>
                  <a href="#services" className="text-ivory/65 hover:text-champagne transition-colors text-sm">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="eyebrow text-champagne mb-5">Company</div>
            <ul className="space-y-3">
              <li><a href="#why-speedleads" className="text-ivory/65 hover:text-champagne transition-colors text-sm">אודות</a></li>
              <li><a href="#faq" className="text-ivory/65 hover:text-champagne transition-colors text-sm">שאלות נפוצות</a></li>
              <li><a href="#success-stories" className="text-ivory/65 hover:text-champagne transition-colors text-sm">לקוחות</a></li>
            </ul>
          </div>

          <div>
            <div className="eyebrow text-champagne mb-5">Contact</div>
            <ul className="space-y-3 text-sm text-ivory/65">
              <li dir="ltr" className="text-right">info@speedleads-ai.com</li>
              <li dir="ltr" className="text-right">+972 3-1234567</li>
              <li>תל אביב, ישראל</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-ivory/10">
          <p className="text-ivory/35 text-xs font-tech">
            © {new Date().getFullYear()} SPEEDLEADS.AI — כל הזכויות שמורות.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-xs">
            <Link to="/privacy" className="text-ivory/45 hover:text-champagne transition-colors">פרטיות</Link>
            <Link to="/terms" className="text-ivory/45 hover:text-champagne transition-colors">תקנון</Link>
            <Link to="/accessibility" className="text-ivory/45 hover:text-champagne transition-colors">נגישות</Link>
            <Link to="/cookies" className="text-ivory/45 hover:text-champagne transition-colors">עוגיות</Link>
          </div>
        </div>
      </div>

      {/* Oversized watermark wordmark */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none select-none mt-14 -mb-6 overflow-hidden"
        dir="ltr"
      >
        <div
          className="font-tech text-center whitespace-nowrap leading-none"
          style={{
            fontSize: 'clamp(3rem, 11vw, 11rem)',
            letterSpacing: '-0.02em',
            WebkitTextStroke: '1px rgba(212, 175, 122, 0.22)',
            color: 'transparent',
          }}
        >
          SPEEDLEADS.AI
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
