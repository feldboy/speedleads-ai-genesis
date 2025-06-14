
import React, { useState, useEffect } from 'react';
import { useChatbot } from '@/hooks/useChatbot';
import { useLeadForm } from '@/hooks/useLeadForm';
import ChatMessage from '@/components/chat/ChatMessage';
import LeadForm from '@/components/chat/LeadForm';
import ChatInput from '@/components/chat/ChatInput';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  options?: string[];
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const [showForm, setShowForm] = useState(false);
  const { messages, userInput, setUserInput, messagesEndRef, handleSendMessage, setMessages } = useChatbot();
  
  const addMessage = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  const { leadData, handleFormChange, handleFormSubmit } = useLeadForm(addMessage, () => setShowForm(false));

  // Handle closing form when chatbot is closed externally
  useEffect(() => {
    if (!isOpen) {
      setShowForm(false);
    }
  }, [isOpen]);

  const handleOptionClick = (option: string) => {
    handleSendMessage(option, () => setShowForm(true));
  };

  const handleSendUserMessage = () => {
    handleSendMessage(userInput, () => setShowForm(true));
  };

  return (
    <div 
      className={`fixed bottom-32 left-10 md:bottom-32 md:left-10 sm:bottom-28 sm:left-4 w-80 md:w-96 sm:w-[95vw] bg-white rounded-lg shadow-2xl z-50 transition-all duration-300 ease-in-out transform ${
        isOpen 
          ? 'opacity-100 scale-100 animate-fade-in' 
          : 'opacity-0 scale-0 pointer-events-none'
      } origin-bottom-left border border-white/30`} 
      style={{ boxShadow: '0 8px 32px 0 rgba(59, 130, 246, 0.18)' }}
      aria-hidden={!isOpen}
    >
      {/* Chat header */}
      <div className="bg-dark text-white p-4 rounded-t-lg flex justify-between items-center">
        <div className="flex items-center space-x-2 space-x-reverse rtl:space-x-reverse">
          <div className="w-8 h-8 rounded-full bg-tech-blue flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <title>Chatbot Icon</title>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold">SpeedLeads.AI</h3>
            <p className="text-xs text-gray-300">מומחה וירטואלי</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-300 hover:text-white focus:outline-none"
          aria-label="Close Chat Window"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <title>Close Chat Window</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Chat messages */}
      <div className="p-4 h-96 overflow-y-auto" dir="rtl">
        {messages.map((message) => (
          <ChatMessage 
            key={message.id} 
            message={message} 
            onOptionClick={handleOptionClick}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Lead form or chat input */}
      {showForm ? (
        <LeadForm 
          leadData={leadData}
          onFormChange={handleFormChange}
          onFormSubmit={handleFormSubmit}
        />
      ) : (
        <ChatInput 
          userInput={userInput}
          onInputChange={setUserInput}
          onSendMessage={handleSendUserMessage}
        />
      )}
    </div>
  );
};

export default Chatbot;
