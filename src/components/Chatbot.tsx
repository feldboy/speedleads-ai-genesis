import { useState, useEffect, useRef, type ChangeEvent, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  options?: string[];
}

interface LeadData {
  name: string;
  email: string;
  company?: string;
  interest?: string;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [leadData, setLeadData] = useState<LeadData>({
    name: '',
    email: '',
    company: '',
    interest: '',
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat with welcome message
  useEffect(() => {
    if (messages.length === 0) { // Initialize only if messages are empty
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
  }, [messages.length]); // Depend on messages.length to re-evaluate if needed, but logic inside prevents re-init

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle closing form when chatbot is closed externally
  useEffect(() => {
    if (!isOpen) {
      setShowForm(false);
    }
  }, [isOpen]);

  const handleSendMessage = (text: string = userInput) => {
    if (!text.trim()) return;

    const newUserMessage: Message = {
      id: `user-${Date.now()}`,
      text,
      sender: 'user'
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setUserInput('');

    setTimeout(() => {
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
        setShowForm(true);
      } else {
        botResponse = {
          id: `bot-${Date.now()}`,
          text: '!זו שאלה מצוינת! כדי לתת לך את המענה המדויק ביותר, אמליץ לך להשאיר פרטים ואחד המומחים שלנו יחזור אליך.',
          sender: 'bot'
        };
        setShowForm(true);
      }

      setMessages(prev => [...prev, botResponse]);
    }, 750);
  };

  const handleOptionClick = (option: string) => {
    handleSendMessage(option);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLeadData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Add form data as user message
    const formMessage: Message = {
      id: `user-form-${Date.now()}`,
      text: `שם: ${leadData.name}, אימייל: ${leadData.email}${leadData.company ? `, חברה: ${leadData.company}` : ''}${leadData.interest ? `, תחום עניין: ${leadData.interest}` : ''}`,
      sender: 'user'
    };
    
    setMessages(prev => [...prev, formMessage]);
    setShowForm(false);
    
    // Add thank you message from bot
    setTimeout(() => {
      const thankYouMessage: Message = {
        id: `bot-thanks-${Date.now()}`,
        text: `מצוין, ${leadData.name}. קיבלתי את כל הפרטים. מומחה שלנו ייצור איתך קשר בהקדם. בינתיים, האם יש עוד משהו שאוכל לעזור בו?`,
        sender: 'bot',
        options: ['לא, תודה!', 'כן, יש לי עוד שאלה']
      };
      setMessages(prev => [...prev, thankYouMessage]);
      
      // Save lead data (in a real app, this would be sent to a server)
      console.log('Lead data collected:', leadData);
      
      toast({
        title: "תודה!",
        description: "פרטיך נשמרו. נציג יצור איתך קשר בקרוב.",
      });
      
      // Reset form
      setLeadData({
        name: '',
        email: '',
        company: '',
        interest: ''
      });
    }, 750);
  };

  return (
    <>
      {/* Chatbot window */}
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
            <div 
              key={message.id} 
              className={`mb-4 ${message.sender === 'bot' ? 'text-right' : 'text-left'}`}
            >
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
                      onClick={() => handleOptionClick(option)}
                      className="bg-gray-200 text-dark text-sm rounded-full px-3 py-1 hover:bg-gray-300 transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Lead form */}
        {showForm ? (
          <form onSubmit={handleFormSubmit} className="p-4 border-t border-gray-200">
            <div className="mb-3">
              <Input
                type="text"
                name="name"
                value={leadData.name}
                onChange={handleFormChange}
                placeholder="השם שלך"
                required
                className="w-full"
              />
            </div>
            <div className="mb-3">
              <Input
                type="email"
                name="email"
                value={leadData.email}
                onChange={handleFormChange}
                placeholder="האימייל שלך"
                required
                className="w-full"
              />
            </div>
            <div className="mb-3">
              <Input
                type="text"
                name="company"
                value={leadData.company}
                onChange={handleFormChange}
                placeholder="שם החברה (אופציונלי)"
                className="w-full"
              />
            </div>
            <div className="mb-3">
              <Input
                type="text"
                name="interest"
                value={leadData.interest}
                onChange={handleFormChange}
                placeholder="תחום עניין (אופציונלי)"
                className="w-full"
              />
            </div>
            <Button 
              id="chatbot_submit_lead_details_button"
              type="submit" 
              className="w-full bg-tech-blue hover:bg-tech-blue/80 text-dark"
            >
              שלח פרטים
            </Button>
          </form>
        ) : (
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <Input
                type="text"
                value={userInput}
                onChange={handleInputChange}
                placeholder="הקלד הודעה..."
                className="w-full"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button
                id="chatbot_send_message_button"
                onClick={() => handleSendMessage()}
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
        )}
      </div>
    </>
  );
};

export default Chatbot;
