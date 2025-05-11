
import React, { useState, useEffect } from 'react';
import { PlusSquare, MinusSquare, Eye, X, SunMoon, FileX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface AccessibilityMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccessibilityMenu: React.FC<AccessibilityMenuProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [disableAnimations, setDisableAnimations] = useState(false);

  // Apply font size changes
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
    return () => {
      document.documentElement.style.fontSize = '';
    };
  }, [fontSize]);

  // Apply high contrast mode
  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast-mode');
    } else {
      document.body.classList.remove('high-contrast-mode');
    }
    return () => {
      document.body.classList.remove('high-contrast-mode');
    };
  }, [highContrast]);

  // Apply animation disabling
  useEffect(() => {
    if (disableAnimations) {
      document.body.classList.add('disable-animations');
    } else {
      document.body.classList.remove('disable-animations');
    }
    return () => {
      document.body.classList.remove('disable-animations');
    };
  }, [disableAnimations]);

  const increaseFontSize = () => {
    if (fontSize < 150) {
      setFontSize(fontSize + 10);
      toast({
        title: "גודל טקסט הוגדל",
        description: "גודל הטקסט באתר גדל ל-" + (fontSize + 10) + "%",
      });
    }
  };

  const decreaseFontSize = () => {
    if (fontSize > 70) {
      setFontSize(fontSize - 10);
      toast({
        title: "גודל טקסט הוקטן",
        description: "גודל הטקסט באתר קטן ל-" + (fontSize - 10) + "%",
      });
    }
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
    toast({
      title: highContrast ? "מצב ניגודיות גבוהה כבוי" : "מצב ניגודיות גבוהה מופעל",
      description: highContrast 
        ? "חזרה למצב תצוגה רגיל" 
        : "מצב ניגודיות גבוהה הופעל לשיפור הקריאות",
    });
  };

  const toggleAnimations = () => {
    setDisableAnimations(!disableAnimations);
    toast({
      title: disableAnimations ? "אנימציות הופעלו מחדש" : "אנימציות הושבתו",
      description: disableAnimations 
        ? "כל האנימציות באתר הופעלו מחדש" 
        : "כל האנימציות באתר הושבתו לחווית שימוש נוחה יותר",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={onClose}>
      <div 
        className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md mx-4 shadow-xl" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">הגדרות נגישות</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-6">
          {/* Font Size Controls */}
          <div className="border-b pb-4">
            <h3 className="font-medium mb-3">גודל טקסט</h3>
            <div className="flex items-center justify-between">
              <Button 
                variant="outline" 
                size="sm"
                onClick={decreaseFontSize}
                disabled={fontSize <= 70}
              >
                <MinusSquare className="h-5 w-5" />
                <span className="mr-2">הקטן טקסט</span>
              </Button>
              
              <span className="font-mono">{fontSize}%</span>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={increaseFontSize}
                disabled={fontSize >= 150}
              >
                <PlusSquare className="h-5 w-5" />
                <span className="mr-2">הגדל טקסט</span>
              </Button>
            </div>
          </div>

          {/* High Contrast Mode */}
          <div className="border-b pb-4">
            <h3 className="font-medium mb-3">ניגודיות גבוהה</h3>
            <Button 
              variant={highContrast ? "default" : "outline"} 
              className="w-full"
              onClick={toggleHighContrast}
            >
              <SunMoon className="h-5 w-5 mr-2" />
              {highContrast ? "בטל ניגודיות גבוהה" : "הפעל ניגודיות גבוהה"}
            </Button>
          </div>

          {/* Disable Animations */}
          <div className="border-b pb-4">
            <h3 className="font-medium mb-3">אנימציות</h3>
            <Button 
              variant={disableAnimations ? "default" : "outline"} 
              className="w-full"
              onClick={toggleAnimations}
            >
              <FileX className="h-5 w-5 mr-2" />
              {disableAnimations ? "הפעל אנימציות" : "השבת אנימציות"}
            </Button>
          </div>

          {/* Link to Accessibility Statement */}
          <div>
            <Button 
              variant="ghost" 
              className="w-full text-tech-blue hover:text-tech-blue/80"
              onClick={() => window.location.href = '/accessibility'}
            >
              <Eye className="h-5 w-5 mr-2" />
              הצהרת נגישות
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityMenu;
