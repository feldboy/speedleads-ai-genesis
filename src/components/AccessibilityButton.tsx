import React from 'react';
import { MessageCircle } from 'lucide-react'; // Assuming MessageCircle can represent WhatsApp

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/972528226602', '_blank');
  };

  return (
    <button
      type="button"
      id="whatsapp_floating_button"
      onClick={handleWhatsAppClick}
      className="fixed bottom-4 right-10 md:bottom-4 md:right-10 sm:bottom-2 sm:right-4 bg-green-500 hover:bg-green-600 text-white rounded-full p-3 md:p-3 sm:p-2 shadow-lg z-40 transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in border border-green-400"
      aria-label="שלח הודעה בוואטסאפ"
      title="וואטסאפ"
      style={{ boxShadow: '0 8px 32px 0 rgba(0,0,0,0.10)' }}
    >
      <MessageCircle className="h-5 w-5 md:h-5 md:w-5 sm:h-4 sm:w-4" />
    </button>
  );
};

export default WhatsAppButton;
