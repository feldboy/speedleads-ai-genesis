
import React from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  options?: string[];
}

interface ChatMessageProps {
  message: Message;
  onOptionClick: (option: string) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, onOptionClick }) => {
  return (
    <div className={`mb-4 ${message.sender === 'bot' ? 'text-right' : 'text-left'}`}>
      <div 
        className={`inline-block rounded-lg p-3 ${
          message.sender === 'bot' 
            ? 'bg-gray-100 text-dark' 
            : 'bg-tech-blue text-dark ml-auto'
        }`}
      >
        {message.text}
      </div>
      
      {message.options && (
        <div className="mt-2 flex flex-wrap gap-2 justify-end">
          {message.options.map((option) => (
            <button
              type="button"
              key={option}
              id={`chatbot_option_${option.replace(/\s+/g, '_').toLowerCase()}`}
              onClick={() => onOptionClick(option)}
              className="bg-gray-200 text-dark text-sm rounded-full px-3 py-1 hover:bg-gray-300 transition-colors"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
