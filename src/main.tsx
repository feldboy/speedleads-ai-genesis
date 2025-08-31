import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { TwentyFirstToolbar } from '@21st-extension/toolbar-react';
import './index.css';

// Render the main app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Only show toolbar in development environment
const isDevelopment = import.meta.env.DEV || 
  import.meta.env.MODE === 'development' || 
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1' ||
  window.location.hostname.includes('local');

if (isDevelopment) {
  // Initialize toolbar separately
  const toolbarConfig = {
    plugins: [], // Add your custom plugins here
  };

  document.addEventListener('DOMContentLoaded', () => {
    const toolbarRoot = document.createElement('div');
    toolbarRoot.id = 'stagewise-toolbar-root'; // Ensure a unique ID
    document.body.appendChild(toolbarRoot);

    createRoot(toolbarRoot).render(
      <StrictMode>
        <TwentyFirstToolbar config={toolbarConfig} />
      </StrictMode>
    );
  });
}
