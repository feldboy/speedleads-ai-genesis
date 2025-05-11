
// This is a simplified GA4 integration module
// In a production environment, you'd likely use gtag.js directly or a more robust analytics library

let initialized = false;
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your actual GA4 Measurement ID when available

/**
 * Initialize Google Analytics
 */
export const initializeAnalytics = () => {
  if (initialized) return;
  
  try {
    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
    
    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      send_page_view: false // We'll track page views manually for more control
    });
    
    initialized = true;
    console.log('Analytics initialized successfully');
  } catch (error) {
    console.error('Failed to initialize analytics:', error);
  }
};

/**
 * Track an event with Google Analytics
 */
export const trackEvent = (eventName: string, eventParams: Record<string, any> = {}) => {
  if (!initialized) {
    console.warn('Attempted to track event before analytics initialization');
    return;
  }
  
  try {
    window.gtag('event', eventName, eventParams);
    console.log(`Tracked event: ${eventName}`, eventParams);
  } catch (error) {
    console.error(`Failed to track event ${eventName}:`, error);
  }
};

/**
 * Track a page view with Google Analytics
 */
export const trackPageView = (pageTitle: string, pagePath: string = window.location.pathname) => {
  trackEvent('page_view', {
    page_title: pageTitle,
    page_location: window.location.href,
    page_path: pagePath
  });
};

// Add window interface augmentation for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
