
import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Cookie } from 'lucide-react';

interface CookieConsentProps {
  onAction: (accepted: boolean) => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onAction }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 z-50 shadow-lg">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3 max-w-3xl">
            <Cookie className="h-6 w-6 text-tech-blue flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-medium text-lg mb-1">אנו משתמשים בעוגיות</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                אתר זה משתמש בעוגיות כדי לשפר את חווית המשתמש שלך ולספק לנו נתונים אנליטיים שיעזרו לנו לשפר את השירות. 
                עיין ב<a href="/privacy" className="text-tech-blue hover:underline">מדיניות הפרטיות</a> ו<a href="/cookies" className="text-tech-blue hover:underline">מדיניות העוגיות</a> שלנו.
              </p>
            </div>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Button 
              className="flex-1 md:flex-none"
              variant="outline" 
              onClick={() => onAction(false)}
              id="cookie_decline_button"
            >
              <X className="ml-2 h-4 w-4" />
              דחה
            </Button>
            <Button 
              className="flex-1 md:flex-none bg-tech-blue hover:bg-tech-blue/80 text-dark" 
              onClick={() => onAction(true)}
              id="cookie_accept_button"
            >
              קבל הכל
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
