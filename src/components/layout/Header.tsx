
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 ${
        isScrolled 
          ? 'bg-dark bg-opacity-95 shadow-md py-2' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <a href="#" className="flex items-center">
            <span className="text-white text-2xl font-bold">
              Speed<span className="text-tech-blue">Leads</span>.AI
            </span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-0 space-x-reverse space-x-8 rtl:space-x-reverse">
          <a href="#services" className="text-white hover:text-tech-blue transition-colors">השירותים שלנו</a>
          <a href="#advantages" className="text-white hover:text-tech-blue transition-colors">היתרונות</a>
          <a href="#clients" className="text-white hover:text-tech-blue transition-colors">לקוחות</a>
          <a href="#faq" className="text-white hover:text-tech-blue transition-colors">שאלות נפוצות</a>
          <Button 
            id="header_contact_button"
            className="bg-transparent border border-tech-blue text-tech-blue hover:bg-tech-blue hover:text-dark"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            צור קשר
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            className="text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-dark bg-opacity-95 py-5 px-4">
          <div className="flex flex-col space-y-4">
            <a 
              href="#services" 
              className="text-white hover:text-tech-blue transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              השירותים שלנו
            </a>
            <a 
              href="#advantages" 
              className="text-white hover:text-tech-blue transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              היתרונות
            </a>
            <a 
              href="#clients" 
              className="text-white hover:text-tech-blue transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              לקוחות
            </a>
            <a 
              href="#faq" 
              className="text-white hover:text-tech-blue transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              שאלות נפוצות
            </a>
            <Button 
              id="header_mobile_contact_button"
              className="bg-transparent border border-tech-blue text-tech-blue hover:bg-tech-blue hover:text-dark w-full"
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                setMobileMenuOpen(false);
              }}
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
