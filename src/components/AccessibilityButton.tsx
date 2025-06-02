
import React from 'react';
import { Accessibility } from 'lucide-react';

const AccessibilityButton = () => {
  const handleAccessibilityClick = () => {
    // Try to trigger the Sienna accessibility widget
    // The widget script is loaded from https://website-widgets.pages.dev/dist/sienna.min.js
    if ((window as any).sienna) {
      (window as any).sienna.toggle();
    } else {
      // Fallback: look for the widget button in the DOM
      const widgetButton = document.querySelector('.__sienna-widget button');
      if (widgetButton) {
        (widgetButton as HTMLElement).click();
      }
    }
  };

  return (
    <button
      type="button"
      id="accessibility_floating_button"
      onClick={handleAccessibilityClick}
      className="fixed bottom-6 left-6 bg-white/50 backdrop-blur-sm hover:bg-white/70 text-dark rounded-full p-3 shadow-lg z-40 transition-all duration-300 hover:scale-110 border border-white/20"
      aria-label="פתח אפשרויות נגישות"
      title="נגישות"
    >
      <Accessibility className="h-5 w-5" />
    </button>
  );
};

export default AccessibilityButton;
