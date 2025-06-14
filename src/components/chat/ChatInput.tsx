
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ChatInputProps {
  userInput: string;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ userInput, onInputChange, onSendMessage }) => {
  return (
    <div className="p-4 border-t border-gray-200">
      <div className="flex gap-2">
        <Input
          type="text"
          value={userInput}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="הקלד הודעה..."
          className="w-full"
          onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
        />
        <Button
          id="chatbot_send_message_button"
          onClick={onSendMessage}
          className="bg-tech-blue hover:bg-tech-blue/80 text-dark px-4"
          aria-label="Send Message"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <title>Send Message</title>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
