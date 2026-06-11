
import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  options?: string[];
}

export const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const initialMessage: Message = {
        id: 'welcome',
        text: 'היי! 👋 אני הבוט החכם של SpeedLeads.AI. איך אני יכול לעזור לך היום?',
        sender: 'bot',
        options: [
          'ספר לי על בניית אתרים',
          'אני מעוניין באוטומציות',
          'אני רוצה הצעת מחיר',
          'שאלה אחרת'
        ]
      };
      setMessages([initialMessage]);
    }
  }, [messages.length]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateBotResponse = (text: string): Message => {
    let botResponse: Message;

    if (text === 'ספר לי על בניית אתרים') {
      botResponse = {
        id: `bot-${Date.now()}`,
        text: 'מעולה! אנחנו מתמחים בבניית אתרי תדמית, חנויות אונליין ודפי נחיתה מבוססי AI. האתרים שלנו לא רק נראים מדהים, אלא גם מותאמים למנועי חיפוש וממירים. האם יש סוג אתר ספציפי שמעניין אותך?',
        sender: 'bot',
        options: ['אתר תדמית', 'חנות אונליין', 'דף נחיתה', 'אני רוצה הצעת מחיר']
      };
    } else if (text === 'אני מעוניין באוטומציות') {
      botResponse = {
        id: `bot-${Date.now()}`,
        text: 'נהדר! אנחנו מפתחים אוטומציות חכמות שיכולות לחסוך לך זמן, כסף ומשאבים. האוטומציות שלנו מותאמות לצרכים הספציפיים של העסק שלך. האם תרצה לספר לנו קצת על התהליכים שהיית רוצה לייעל?',
        sender: 'bot',
        options: ['תהליכי שיווק', 'תהליכי מכירות', 'תהליכים תפעוליים', 'אני רוצה הצעת מחיר']
      };
    } else if (text === 'אני רוצה הצעת מחיר' || text.includes('הצעת מחיר')) {
      botResponse = {
        id: `bot-${Date.now()}`,
        text: 'בשמחה! כדי שאוכל להכין לך הצעה ראשונית או לקשר אותך למומחה שלנו, אשמח לכמה פרטים.',
        sender: 'bot'
      };
    } else {
      botResponse = {
        id: `bot-${Date.now()}`,
        text: '!זו שאלה מצוינת! כדי לתת לך את המענה המדויק ביותר, אמליץ לך להשאיר פרטים ואחד המומחים שלנו יחזור אליך.',
        sender: 'bot'
      };
    }

    return botResponse;
  };

  const handleSendMessage = (text: string = userInput, onShowForm?: () => void) => {
    if (!text.trim()) return;

    const newUserMessage: Message = {
      id: `user-${Date.now()}`,
      text,
      sender: 'user'
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');

    setTimeout(() => {
      const botResponse = generateBotResponse(text);
      setMessages(prev => [...prev, botResponse]);
      
      // Show form if needed
      if ((text === 'אני רוצה הצעת מחיר' || text.includes('הצעת מחיר') || 
          (!['ספר לי על בניית אתרים', 'אני מעוניין באוטומציות'].includes(text))) && onShowForm) {
        onShowForm();
      }
    }, 750);
  };

  return {
    messages,
    userInput,
    setUserInput,
    messagesEndRef,
    handleSendMessage,
    setMessages
  };
};
