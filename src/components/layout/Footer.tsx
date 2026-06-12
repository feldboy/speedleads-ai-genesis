import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto">
        {/* Top: oversized CTA */}
        <div className="asym-grid items-end mb-20 pb-16 border-b border-white/10">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="section-index text-tech-blue">∞ / END</span>
              <span className="h-px w-12 bg-tech-blue/40" />
              <span className="eyebrow text-white/50">Let's build</span>
            </div>
            <h2 className="heading-he display-lg text-white">
              נדבר על <br />
              <span className="gradient-text">הפרויקט שלך?</span>
            </h2>
          </div>
          <div className="lg:justify-self-end">
            <Button
              id="footer_contact_button"
              className="btn-brand text-white px-8 py-4 text-sm uppercase tracking-wider"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              דברו איתנו →
            </Button>
          </div>
        </div>

        {/* Cols */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img src="/speedleads-logo.png" alt="SpeedLeads.AI Logo" className="h-7" />
              <span className="font-display text-white text-lg font-semibold">
                Speed<span className="gradient-text">Leads</span>.AI
              </span>
            </div>
            <p className="text-white/60 leading-relaxed text-sm max-w-xs">
              פתרונות דיגיטליים מתקדמים מבוססי AI לעסקים שרוצים להוביל את השוק.
            </p>
            <div className="flex gap-3 mt-6">
              {['facebook', 'twitter', 'instagram', 'linkedin'].map((name) => (
                <a
                  key={name}
                  href="#"
                  id={`footer_link_${name}`}
                  className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/60 hover:text-tech-blue hover:border-tech-blue transition-colors"
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
            <div className="eyebrow text-tech-blue mb-5">Services</div>
            <ul className="space-y-3">
              {[
                ['#services', 'בניית אתרים'],
                ['#services', 'דפי נחיתה'],
                ['#services', 'חנויות אונליין'],
                ['#services', 'אינטגרציות AI'],
                ['#services', 'אוטומציות'],
              ].map(([href, label]) => (
                <li key={label}>
                  <a href={href} className="text-white/70 hover:text-tech-blue transition-colors text-sm">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="eyebrow text-tech-blue mb-5">Company</div>
            <ul className="space-y-3">
              <li><a href="#why-speedleads" className="text-white/70 hover:text-tech-blue transition-colors text-sm">אודות</a></li>
              <li><a href="#faq" className="text-white/70 hover:text-tech-blue transition-colors text-sm">שאלות נפוצות</a></li>
              <li><a href="#success-stories" className="text-white/70 hover:text-tech-blue transition-colors text-sm">לקוחות</a></li>
            </ul>
          </div>

          <div>
            <div className="eyebrow text-tech-blue mb-5">Contact</div>
            <ul className="space-y-3 text-sm text-white/70">
              <li>info@speedleads-ai.com</li>
              <li>+972 3-1234567</li>
              <li>תל אביב, ישראל</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} SpeedLeads.AI — כל הזכויות שמורות.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-xs">
            <Link to="/privacy" className="text-white/50 hover:text-tech-blue transition-colors">פרטיות</Link>
            <Link to="/terms" className="text-white/50 hover:text-tech-blue transition-colors">תקנון</Link>
            <Link to="/accessibility" className="text-white/50 hover:text-tech-blue transition-colors">נגישות</Link>
            <Link to="/cookies" className="text-white/50 hover:text-tech-blue transition-colors">עוגיות</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
