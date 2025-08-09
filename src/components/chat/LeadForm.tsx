
import React, { type ChangeEvent, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface LeadData {
  name: string;
  email: string;
  company?: string;
  interest?: string;
}

interface LeadFormProps {
  leadData: LeadData;
  onFormChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFormSubmit: (e: FormEvent) => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ leadData, onFormChange, onFormSubmit }) => {
  return (
    <form onSubmit={onFormSubmit} className="p-4 border-t border-gray-200">
      <div className="mb-3">
        <Input
          type="text"
          name="name"
          value={leadData.name}
          onChange={onFormChange}
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
          onChange={onFormChange}
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
          onChange={onFormChange}
          placeholder="שם החברה (אופציונלי)"
          className="w-full"
        />
      </div>
      <div className="mb-3">
        <Input
          type="text"
          name="interest"
          value={leadData.interest}
          onChange={onFormChange}
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
  );
};

export default LeadForm;
