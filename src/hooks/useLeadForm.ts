
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useToast } from "@/components/ui/use-toast";

interface LeadData {
  name: string;
  email: string;
  company?: string;
  interest?: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  options?: string[];
}

export const useLeadForm = (
  onAddMessage: (message: Message) => void,
  onHideForm: () => void
) => {
  const { toast } = useToast();
  const [leadData, setLeadData] = useState<LeadData>({
    name: '',
    email: '',
    company: '',
    interest: ''
  });

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
    
    onAddMessage(formMessage);
    onHideForm();
    
    // Add thank you message from bot
    setTimeout(() => {
      const thankYouMessage: Message = {
        id: `bot-thanks-${Date.now()}`,
        text: `מצוין, ${leadData.name}. קיבלתי את כל הפרטים. מומחה שלנו ייצור איתך קשר בהקדם. בינתיים, האם יש עוד משהו שאוכל לעזור בו?`,
        sender: 'bot',
        options: ['לא, תודה!', 'כן, יש לי עוד שאלה']
      };
      onAddMessage(thankYouMessage);
      
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

  return {
    leadData,
    handleFormChange,
    handleFormSubmit
  };
};
