// Utility function to convert page names to URL paths

export const createPageUrl = (pageName: string): string => {
  switch (pageName.toLowerCase()) {
    case 'home':
      return '/';
    case 'catalog':
      return '/catalog';
    case 'blog':
      return '/blog';
    case 'about':
      return '/about';
    case 'contact':
      return '/contact';
    // Add other page names as needed
    default:
      // Default to lowercase page name as path, might need adjustment
      return `/${pageName.toLowerCase()}`; 
  }
};
