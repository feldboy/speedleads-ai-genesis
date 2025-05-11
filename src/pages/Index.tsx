
import React, { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AdvantagesSection from '@/components/sections/AdvantagesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FaqSection from '@/components/sections/FaqSection';
import ContactSection from '@/components/sections/ContactSection';
import Chatbot from '@/components/Chatbot';

const Index = () => {
  // Google Analytics event tracking
  useEffect(() => {
    const trackClickEvent = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickableElement = target.closest('[id]');
      
      if (clickableElement && clickableElement.id) {
        console.log(`Analytics: Clicked element with ID: ${clickableElement.id}`);
        // In a real implementation, we would use GA4 here
        // Example: gtag('event', 'click', { 'element_id': clickableElement.id });
      }
    };

    // Add click tracking
    document.addEventListener('click', trackClickEvent);
    
    // Log page view
    console.log('Analytics: Page view - Homepage');
    // In a real implementation: gtag('event', 'page_view', { page_title: 'Homepage' });
    
    return () => {
      document.removeEventListener('click', trackClickEvent);
    };
  }, []);

  return (
    <div dir="rtl" lang="he" className="min-h-screen bg-white text-dark relative">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <AdvantagesSection />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <Chatbot />
      
      {/* WhatsApp floating button */}
      <a 
        href="https://wa.me/9721234567" 
        target="_blank"
        rel="noopener noreferrer"
        id="whatsapp_floating_button"
        className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#20BD5C] text-white rounded-full p-4 shadow-lg z-40 transition-transform duration-300 hover:scale-105"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      </a>
      
      {/* Accessibility button */}
      <button 
        id="accessibility_menu_button"
        className="fixed top-20 right-6 bg-white text-dark border border-gray-300 rounded-full p-3 shadow-lg z-40 transition-transform duration-300 hover:scale-105"
        aria-label="פתח תפריט נגישות"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      </button>
    </div>
  );
};

export default Index;
