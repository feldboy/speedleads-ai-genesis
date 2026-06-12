import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToSection } from '@/lib/scroll';

const navItems = [
  { id: 'services', label: 'שירותים' },
  { id: 'why-speedleads', label: 'למה אנחנו' },
  { id: 'success-stories', label: 'עבודות' },
  { id: 'faq', label: 'שאלות' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goTo = (id: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
    } else {
      scrollToSection(id);
    }
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'glass-navbar py-2.5' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="flex items-center gap-3 group" id="header_logo_link">
          <img
            src="/speedleads-logo.png"
            alt="SpeedLeads.AI Logo"
            className="h-7 md:h-8 transition-transform duration-500 group-hover:rotate-[8deg]"
          />
          <span className="font-tech text-ivory text-base md:text-lg tracking-tight" dir="ltr">
            SPEEDLEADS<span className="text-champagne">.AI</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-9">
          {navItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => goTo(item.id)}
              className="group relative text-ivory/70 hover:text-ivory text-sm transition-colors duration-300 py-1"
            >
              <span className="section-index text-champagne/70 ml-2">0{i + 1}</span>
              {item.label}
              <span className="absolute -bottom-0.5 right-0 left-0 h-px bg-gradient-to-l from-champagne-light to-champagne scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-right" />
            </button>
          ))}
          <button
            id="header_contact_button"
            className="btn-lux px-6 py-2.5 text-xs tracking-wider"
            onClick={() => goTo('contact')}
          >
            קבעו שיחה
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-ivory min-h-[44px] min-w-[44px] flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'סגור תפריט' : 'פתח תפריט'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* gold hairline under the bar once scrolled */}
      <div
        className={`hairline-gold absolute bottom-0 left-0 right-0 transition-opacity duration-500 ${
          isScrolled ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden glass-navbar overflow-hidden border-t border-champagne/15"
          >
            <div className="flex flex-col gap-1 py-6 px-4">
              {navItems.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => goTo(item.id)}
                  className="text-ivory/80 hover:text-champagne text-right py-3 px-2 border-b border-ivory/5 flex items-center gap-3 transition-colors"
                >
                  <span className="section-index text-champagne/70">0{i + 1}</span>
                  <span>{item.label}</span>
                </button>
              ))}
              <button
                id="header_mobile_contact_button"
                className="btn-lux w-full mt-4 py-3 text-xs tracking-wider"
                onClick={() => goTo('contact')}
              >
                קבעו שיחה
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
