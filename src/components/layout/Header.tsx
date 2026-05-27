import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      setMobileMenuOpen(false);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'services', label: 'שירותים' },
    { id: 'why-speedleads', label: 'למה אנחנו' },
    { id: 'success-stories', label: 'עבודות' },
    { id: 'faq', label: 'שאלות' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-dark/85 backdrop-blur-xl border-b border-white/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="flex items-center gap-3 group">
          <img src="/speedleads-logo.png" alt="SpeedLeads.AI Logo" className="h-7 md:h-8 transition-transform group-hover:scale-110" />
          <span className="font-display text-white text-lg md:text-xl font-semibold tracking-tight">
            Speed<span className="gradient-text">Leads</span>.AI
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, i) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="group relative text-white/80 hover:text-white text-sm transition-colors"
            >
              <span className="section-index text-tech-blue/60 mr-2">0{i + 1}</span>
              {item.label}
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-l from-[#00f6ff] to-[#00a7ff] scale-x-0 group-hover:scale-x-100 transition-transform origin-right" />
            </button>
          ))}
          <Button
            id="header_contact_button"
            className="btn-brand text-white px-6 py-2 text-xs uppercase tracking-wider"
            onClick={() => scrollToSection('contact')}
          >
            צור קשר
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="text-white min-h-[44px] min-w-[44px]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-dark/95 backdrop-blur-xl py-6 px-4 border-t border-white/10">
          <div className="flex flex-col gap-1">
            {navItems.map((item, i) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-white/80 hover:text-tech-blue text-right py-3 px-2 border-b border-white/5 flex items-center gap-3"
              >
                <span className="section-index text-tech-blue/60">0{i + 1}</span>
                <span>{item.label}</span>
              </button>
            ))}
            <Button
              id="header_mobile_contact_button"
              className="btn-brand text-white w-full mt-4 py-3 text-xs uppercase tracking-wider"
              onClick={() => scrollToSection('contact')}
            >
              צור קשר
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
