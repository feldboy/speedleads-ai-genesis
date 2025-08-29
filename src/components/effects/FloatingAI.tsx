
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles } from 'lucide-react';
import Chatbot from '@/components/Chatbot';

const FloatingAI = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    console.log('FloatingAI: toggleChatbot called. Current isChatbotOpen state:', isChatbotOpen, 'Will be set to:', !isChatbotOpen);
    setIsChatbotOpen(prev => !prev);
  };

  // Close chatbot on Escape key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isChatbotOpen) {
        setIsChatbotOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isChatbotOpen]);

  return (
    <>
      <motion.div
        className="fixed bottom-32 left-6 z-40"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.div
          className="relative"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.button
            className="bg-gradient-to-br from-tech-blue to-blue-600 rounded-full p-4 shadow-2xl cursor-pointer"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0, 246, 255, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleChatbot}
            aria-label="פתח צ'אטבוט"
            type="button"
          >
            <Bot className="w-8 h-8 text-white" />
            
            {/* Floating particles around the AI */}
            <motion.div
              className="absolute -top-1 -right-1"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-gold" />
            </motion.div>
            
            <motion.div
              className="absolute -bottom-1 -left-1"
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-3 h-3 text-tech-blue" />
            </motion.div>
          </motion.button>
          
          {/* Pulsing rings */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-tech-blue/30 pointer-events-none"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-gold/30 pointer-events-none"
            animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          />
        </motion.div>
        
        {/* Tooltip */}
        {!isChatbotOpen && (
          <motion.div
            className="absolute bottom-full mb-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-3 text-sm text-gray-800 whitespace-nowrap pointer-events-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3 }}
          >
            <div className="relative">
              בואו נדבר על הפרויקט שלכם!
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white"></div>
            </div>
          </motion.div>
        )}
      </motion.div>

      <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </>
  );
};

export default FloatingAI;
