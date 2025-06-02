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
  const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      setMobileMenuOpen(false);
    } else {
      document.getElementById(id)?.scrollIntoView({
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };
  return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 ${isScrolled ? 'bg-dark bg-opacity-95 shadow-md py-2' : 'bg-transparent'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <img src="/speedleads-logo.png" alt="SpeedLeads.AI Logo" className="h-7 mr-5" />
            <span className="text-white text-2xl font-bold mx-[14px]">
              Speed<span className="text-tech-blue">Leads</span>.AI
            </span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-0 space-x-reverse space-x-8 rtl:space-x-reverse">
          <Button variant="link" className="text-white hover:text-tech-blue transition-colors p-0" onClick={() => scrollToSection('services')}>
            השירותים שלנו
          </Button>
          <Button variant="link" className="text-white hover:text-tech-blue transition-colors p-0" onClick={() => scrollToSection('advantages')}>
            היתרונות
          </Button>
          <Button variant="link" className="text-white hover:text-tech-blue transition-colors p-0" onClick={() => scrollToSection('clients')}>
            לקוחות
          </Button>
          <Button variant="link" className="text-white hover:text-tech-blue transition-colors p-0" onClick={() => scrollToSection('faq')}>
            שאלות נפוצות
          </Button>
          <Button id="header_contact_button" className="bg-transparent border border-tech-blue text-tech-blue hover:bg-tech-blue hover:text-dark" onClick={() => scrollToSection('contact')}>
            צור קשר
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" className="text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && <nav className="md:hidden bg-dark bg-opacity-95 py-5 px-4">
          <div className="flex flex-col space-y-4">
            <Button variant="link" className="text-white hover:text-tech-blue transition-colors p-0 justify-start" onClick={() => scrollToSection('services')}>
              השירותים שלנו
            </Button>
            <Button variant="link" className="text-white hover:text-tech-blue transition-colors p-0 justify-start" onClick={() => scrollToSection('advantages')}>
              היתרונות
            </Button>
            <Button variant="link" className="text-white hover:text-tech-blue transition-colors p-0 justify-start" onClick={() => scrollToSection('clients')}>
              לקוחות
            </Button>
            <Button variant="link" className="text-white hover:text-tech-blue transition-colors p-0 justify-start" onClick={() => scrollToSection('faq')}>
              שאלות נפוצות
            </Button>
            <Button id="header_mobile_contact_button" className="bg-transparent border border-tech-blue text-tech-blue hover:bg-tech-blue hover:text-dark w-full" onClick={() => scrollToSection('contact')}>
              צור קשר
            </Button>
          </div>
        </nav>}
    </header>;
};
export default Header;