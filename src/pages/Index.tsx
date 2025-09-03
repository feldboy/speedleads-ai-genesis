
import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import VideoSection from '@/components/sections/VideoSection';
import WhySpeedLeadsSection from '@/components/sections/WhySpeedLeadsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FaqSection from '@/components/sections/FaqSection';
import ContactSection from '@/components/sections/ContactSection';
import CookieConsent from '@/components/CookieConsent';
import FloatingAI from '@/components/effects/FloatingAI';
import AnimatedStats from '@/components/effects/AnimatedStats';
import ProjectShowcase from '@/components/effects/ProjectShowcase';
import ServiceCards from '@/components/sections/ServiceCards';
import { Component as HorizonHero } from '@/components/ui/horizon-hero-section';
import { initializeAnalytics, trackEvent } from '@/lib/analytics';

const Index = () => {
  const [cookieConsentShown, setCookieConsentShown] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);
  
  // Initialize analytics after cookie consent
  useEffect(() => {
    // Check if user already gave consent (stored in localStorage)
    const storedConsent = localStorage.getItem('cookieConsent');
    if (storedConsent === 'accepted') {
      setHasConsent(true);
      initializeAnalytics();
    } else {
      setCookieConsentShown(true);
    }
  }, []);

  // Google Analytics event tracking
  useEffect(() => {
    if (!hasConsent) return;
    
    const trackClickEvent = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickableElement = target.closest('[id]');
      
      if (clickableElement?.id) {
        console.log(`Analytics: Clicked element with ID: ${clickableElement.id}`);
        trackEvent('element_click', { 
          element_id: clickableElement.id,
          element_text: clickableElement.textContent?.trim() || '',
          page_location: window.location.pathname
        });
      }
    };

    // Add click tracking
    document.addEventListener('click', trackClickEvent);
    
    // Log page view
    console.log('Analytics: Page view - Homepage');
    trackEvent('page_view', { page_title: 'Homepage' });
    
    return () => {
      document.removeEventListener('click', trackClickEvent);
    };
  }, [hasConsent]);
  
  const handleCookieConsent = (accepted: boolean) => {
    if (accepted) {
      localStorage.setItem('cookieConsent', 'accepted');
      setHasConsent(true);
      initializeAnalytics();
      trackEvent('cookie_consent_accepted', {});
    } else {
      localStorage.setItem('cookieConsent', 'declined');
    }
    setCookieConsentShown(false);
  };

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  return (
    <div dir="rtl" lang="he" className="min-h-screen bg-white text-dark relative overflow-x-hidden">
      <Header />
      <main>
        <HorizonHero />
        <HeroSection />
        
        {/* Animated Stats Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto">
            <AnimatedStats />
          </div>
        </section>

        <ServiceCards />

        {/* Responsive Video Section */}
        <VideoSection />
        
        <WhySpeedLeadsSection />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingAI />
      
      {/* Improved WhatsApp floating button */}
      <a 
        href="https://wa.me/9721234567" 
        target="_blank"
        rel="noopener noreferrer"
        id="whatsapp_floating_button"
        className="fixed bottom-6 right-6 md:bottom-6 md:right-6 sm:bottom-4 sm:right-4 bg-speedleads-whatsapp hover:bg-speedleads-whatsapp-hover text-white rounded-full p-4 md:p-4 sm:p-3 shadow-xl z-40 transition-all duration-300 sm:hover:scale-105 sm:hover:shadow-2xl animate-fade-in border border-white/30"
        style={{ boxShadow: '0 8px 32px 0 rgba(34, 197, 94, 0.25)' }}
        onClick={() => hasConsent && trackEvent('click_whatsapp', {})}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-6 md:w-6 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24" aria-labelledby="whatsappTitle">
          <title id="whatsappTitle">WhatsApp</title>
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      </a>
      
      {/* Cookie Consent Banner */}
      {cookieConsentShown && (
        <CookieConsent onAction={handleCookieConsent} />
      )}
    </div>
  );
};

export default Index;
