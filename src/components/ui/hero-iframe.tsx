import React, { useEffect, useRef, useState } from 'react';

interface HeroMessage {
  type: 'hero-progress';
  progress: number;
  section: number;
  complete: boolean;
}

interface HeroIframeProps {
  onComplete?: () => void;
  onProgress?: (progress: number, section: number) => void;
}

export const HeroIframe: React.FC<HeroIframeProps> = ({ onComplete, onProgress }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent<HeroMessage>) => {
      // Security: Only accept messages from our iframe
      if (event.source !== iframeRef.current?.contentWindow) {
        return;
      }

      if (event.data?.type === 'hero-progress') {
        const { progress, section, complete } = event.data;
        
        // Call progress callback
        onProgress?.(progress, section);
        
        // Handle completion
        if (complete && !isComplete) {
          setIsComplete(true);
          
          // Start fade out after a delay
          setTimeout(() => {
            setFadeOut(true);
            
            // Call completion callback after fade starts
            setTimeout(() => {
              onComplete?.();
            }, 1000); // Match CSS transition duration
          }, 2000); // Show completion state for 2 seconds
        }
      }
    };

    const handleIframeLoad = () => {
      setIsLoading(false);
    };

    // Add event listeners
    window.addEventListener('message', handleMessage);
    
    if (iframeRef.current) {
      iframeRef.current.addEventListener('load', handleIframeLoad);
    }

    return () => {
      window.removeEventListener('message', handleMessage);
      if (iframeRef.current) {
        iframeRef.current.removeEventListener('load', handleIframeLoad);
      }
    };
  }, [onComplete, onProgress, isComplete]);

  return (
    <div 
      className={`hero-iframe-container ${fadeOut ? 'fade-out' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        backgroundColor: '#000',
        transition: 'opacity 1000ms ease-out',
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? 'none' : 'all',
      }}
    >
      {/* Loading indicator */}
      {isLoading && (
        <div 
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: '18px',
            fontWeight: '300',
            letterSpacing: '2px',
            zIndex: 10000,
          }}
        >
          LOADING...
        </div>
      )}
      
      {/* The iframe containing our working HTML demo */}
      <iframe
        ref={iframeRef}
        src="/hero-demo.html"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 500ms ease-in',
        }}
        title="Hero Animation"
        allow="accelerometer; gyroscope"
        sandbox="allow-scripts allow-same-origin"
      />
      
      {/* Completion indicator overlay */}
      {isComplete && !fadeOut && (
        <div 
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
            textAlign: 'center',
            animation: 'pulse 2s ease-in-out infinite',
            zIndex: 10001,
          }}
        >
          <div style={{ fontSize: '14px', marginBottom: '8px', opacity: 0.8 }}>
            Journey Complete
          </div>
          <div style={{ fontSize: '12px', opacity: 0.6, marginBottom: '8px' }}>
            Transitioning to website...
          </div>
          <div style={{ fontSize: '16px', animation: 'bounce 1s infinite' }}>
            ↓
          </div>
        </div>
      )}
    </div>
  );
};

// CSS-in-JS styles for animations
const styles = `
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
  
  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
      transform: translate3d(0, 0, 0);
    }
    40%, 43% {
      transform: translate3d(0, -8px, 0);
    }
    70% {
      transform: translate3d(0, -4px, 0);
    }
    90% {
      transform: translate3d(0, -2px, 0);
    }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}