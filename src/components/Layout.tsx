import React, { useState } from "react"; // Added ReactNode type
import type { ReactNode } from "react"; // Import ReactNode as type
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils/createPageUrl"; // Corrected import path
import { Menu, X, Phone, Mail, Clock, MapPin, Facebook, Instagram } from "lucide-react";

// Define props type including children
interface LayoutProps {
  children: ReactNode;
  currentPageName?: string; // currentPageName might not be needed if using useLocation
}

export default function Layout({ children }: LayoutProps) { // Removed currentPageName from props for now
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Determine active state based on current pathname
  const isActive = (pageName: string) => {
    return location.pathname === createPageUrl(pageName);
  };

  return (
    <div className="flex min-h-screen flex-col bg-cream-50">
      <style>
        {`
          :root {
            --color-green-light: #e0eadd;
            --color-green-medium: #98c082;
            --color-green-dark: #567d46;
            --color-brown-light: #e6d7c3;
            --color-brown-medium: #bb9b7c;
            --color-brown-dark: #5d4a3a;
            --color-cream: #f8f5ef;
            --color-accent: #f5b553; /* Added accent color */
          }

          body {
            background-color: var(--color-cream);
            color: var(--color-brown-dark);
            font-family: 'Assistant', 'Segoe UI', Tahoma, sans-serif;
          }

          .bg-cream-50 {
            background-color: var(--color-cream);
          }

          .bg-green-light {
            background-color: var(--color-green-light);
          }

          .bg-green-medium {
            background-color: var(--color-green-medium);
          }

          .bg-green-dark {
            background-color: var(--color-green-dark);
          }

          .text-green-dark {
            color: var(--color-green-dark);
          }
          
          .text-garden-dark-green { /* Map existing class */
             color: var(--color-green-dark);
          }
          
          .bg-garden-medium-green { /* Map existing class */
             background-color: var(--color-green-medium);
          }
          
          .bg-garden-light-green\\/10 { /* Map existing class */
             background-color: color-mix(in srgb, var(--color-green-light) 10%, transparent);
          }
          
          .bg-garden-cream { /* Map existing class */
             background-color: var(--color-cream);
          }
          
          .border-garden-medium-green { /* Map existing class */
             border-color: var(--color-green-medium);
          }
          
          .text-garden-medium-green { /* Map existing class */
             color: var(--color-green-medium);
          }
          
          .hover\\:text-garden-dark-green:hover { /* Map existing class */
             color: var(--color-green-dark);
          }
          
          .hover\\:bg-garden-dark-green:hover { /* Map existing class */
             background-color: var(--color-green-dark);
          }
          
          .hover\\:bg-garden-cream:hover { /* Map existing class */
             background-color: var(--color-cream);
          }
          
          .bg-garden-light-green { /* Map existing class */
             background-color: var(--color-green-light);
          }

          .border-green-medium {
            border-color: var(--color-green-medium);
          }

          .bg-brown-light {
            background-color: var(--color-brown-light);
          }

          .text-brown-dark {
            color: var(--color-brown-dark);
          }

          .hover-green-dark:hover {
            background-color: var(--color-green-dark);
            color: white;
          }

          .nav-link {
            position: relative;
            padding-bottom: 4px; /* Add padding for the underline */
          }

          .nav-link::after {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: 0; /* Position underline at the bottom */
            left: 50%; /* Start from center */
            transform: translateX(-50%); /* Center the underline */
            background-color: var(--color-green-dark);
            transition: width 0.3s ease;
          }

          .nav-link:hover::after,
          .nav-link.active::after {
            width: 100%;
          }

          .direction-rtl {
            direction: rtl;
          }
          
          /* Define garden-button styles based on layout */
          .garden-button {
            display: inline-block;
            padding: 0.75rem 1.5rem;
            border-radius: 0.375rem; /* rounded-md */
            font-weight: 600; /* font-semibold */
            text-align: center;
            transition: background-color 0.3s ease, color 0.3s ease;
            background-color: var(--color-green-medium);
            color: white;
            border: 1px solid transparent;
          }
          
          .garden-button:hover {
             background-color: var(--color-green-dark);
          }
          
          .garden-button.bg-white {
             background-color: white;
             color: var(--color-green-dark);
             border: 1px solid var(--color-green-dark);
          }
          
          .garden-button.bg-white:hover {
             background-color: var(--color-cream);
          }
          
          .garden-button-outline { /* Style for outline buttons */
             padding: 0.5rem 1rem; /* size-sm */
             border: 1px solid var(--color-green-medium);
             color: var(--color-green-medium);
             background-color: transparent;
          }
          
          .garden-button-outline:hover {
             background-color: var(--color-green-light);
             color: var(--color-green-dark);
          }
          
          /* Define garden-section and garden-container */
          .garden-section {
             padding-top: 4rem; /* py-16 */
             padding-bottom: 4rem; /* py-16 */
          }
          
          .garden-container {
             max-width: 1280px; /* Example max-width, adjust as needed */
             margin-left: auto;
             margin-right: auto;
             padding-left: 1rem; /* px-4 */
             padding-right: 1rem; /* px-4 */
          }
          
          /* Font setup */
          .font-heebo {
             font-family: 'Heebo', sans-serif; /* Assuming Heebo is loaded */
          }
        `}
      </style>

      <header className="bg-white shadow-md sticky top-0 z-50"> {/* Made header sticky */}
        {/* Top info bar */}
        <div className="bg-green-light py-2 direction-rtl">
          <div className="container mx-auto px-4 flex flex-wrap justify-between items-center text-sm text-brown-dark"> {/* Set text color */}
            <div className="flex items-center space-x-4 space-x-reverse">
              <a href="tel:04-9123456" className="flex items-center space-x-1 space-x-reverse hover:text-green-dark"> {/* Make phone clickable */}
                <Phone className="h-4 w-4" />
                <span>04-9123456</span>
              </a>
              <a href="mailto:info@lagan-velaganan.co.il" className="flex items-center space-x-1 space-x-reverse hover:text-green-dark"> {/* Make email clickable */}
                <Mail className="h-4 w-4" />
                <span>info@lagan-velaganan.co.il</span>
              </a>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse mt-1 sm:mt-0"> {/* Added margin top for small screens */}
              <div className="flex items-center space-x-1 space-x-reverse">
                <Clock className="h-4 w-4" />
                <span>א׳-ה׳: 8-19, ו׳: 8-14, ש׳: 9-17</span> {/* Shortened text */}
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <a href="#" target="_blank" rel="noopener noreferrer"> {/* Use anchor for external links */}
                  <Facebook className="h-5 w-5 text-green-dark hover:text-green-medium" /> {/* Increased size */}
                </a>
                <a href="https://www.instagram.com/laganvlaganan/?hl=he" target="_blank" rel="noopener noreferrer"> {/* Use anchor for external links */}
                  <Instagram className="h-5 w-5 text-green-dark hover:text-green-medium" /> {/* Increased size */}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="container mx-auto px-4 py-4 direction-rtl">
          <div className="flex justify-between items-center">
            <Link to={createPageUrl("Home")} className="text-3xl font-bold text-green-dark flex items-center font-heebo"> {/* Re-added styling */}
              <img 
                src="/logo.png" 
                alt="לוגו לגן ולגנן" 
                className="h-12 object-contain ml-2 rounded-full" /* Added rounded-full */
              />
              <span>לגן ולגנן</span> {/* Re-added the span with text */}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6 space-x-reverse text-lg">
              <Link 
                to={createPageUrl("Home")} 
                className={`nav-link ${isActive("Home") ? "text-green-dark font-semibold active" : "text-brown-dark hover:text-green-dark"}`}
              >
                דף הבית
              </Link>
              <Link 
                to={createPageUrl("Catalog")} 
                className={`nav-link ${isActive("Catalog") ? "text-green-dark font-semibold active" : "text-brown-dark hover:text-green-dark"}`}
              >
                קטלוג מוצרים
              </Link>
              <Link 
                to={createPageUrl("Blog")} 
                className={`nav-link ${isActive("Blog") ? "text-green-dark font-semibold active" : "text-brown-dark hover:text-green-dark"}`}
              >
                בלוג וטיפים
              </Link>
              <Link 
                to={createPageUrl("About")} 
                className={`nav-link ${isActive("About") ? "text-green-dark font-semibold active" : "text-brown-dark hover:text-green-dark"}`}
              >
                אודות
              </Link>
              <Link 
                to={createPageUrl("Contact")} 
                className={`nav-link ${isActive("Contact") ? "text-green-dark font-semibold active" : "text-brown-dark hover:text-green-dark"}`}
              >
                יצירת קשר
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              type="button" /* Explicit type */
              className="md:hidden text-green-dark p-2 -mr-2" /* Added padding, negative margin */
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"} /* Accessibility */
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden bg-green-light py-4 direction-rtl absolute top-full left-0 right-0 shadow-lg"> {/* Position absolute */}
            <div className="container mx-auto px-4 flex flex-col space-y-3">
              <Link 
                to={createPageUrl("Home")} 
                className={`block py-2 px-4 rounded-md text-right ${isActive("Home") ? "bg-green-medium text-white font-semibold" : "text-brown-dark hover:bg-green-medium/50"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                דף הבית
              </Link>
              <Link 
                to={createPageUrl("Catalog")} 
                className={`block py-2 px-4 rounded-md text-right ${isActive("Catalog") ? "bg-green-medium text-white font-semibold" : "text-brown-dark hover:bg-green-medium/50"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                קטלוג מוצרים
              </Link>
              <Link 
                to={createPageUrl("Blog")} 
                className={`block py-2 px-4 rounded-md text-right ${isActive("Blog") ? "bg-green-medium text-white font-semibold" : "text-brown-dark hover:bg-green-medium/50"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                בלוג וטיפים
              </Link>
              <Link 
                to={createPageUrl("About")} 
                className={`block py-2 px-4 rounded-md text-right ${isActive("About") ? "bg-green-medium text-white font-semibold" : "text-brown-dark hover:bg-green-medium/50"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                אודות
              </Link>
              <Link 
                to={createPageUrl("Contact")} 
                className={`block py-2 px-4 rounded-md text-right ${isActive("Contact") ? "bg-green-medium text-white font-semibold" : "text-brown-dark hover:bg-green-medium/50"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                יצירת קשר
              </Link>
            </div>
          </nav>
        )}
      </header>

      <main className="flex-grow direction-rtl">
        {children}
      </main>

      <footer className="bg-green-dark text-white py-10 direction-rtl">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 font-heebo">לגן ולגנן</h3>
              <p className="mb-4 text-sm">המשתלה המשפחתית שמביאה את הטבע אליכם הביתה באהבה, מקצועיות וחיוך.</p>
              <div className="flex space-x-4 space-x-reverse">
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-medium">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="https://www.instagram.com/laganvlaganan/?hl=he" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-medium">
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 font-heebo">ניווט מהיר</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to={createPageUrl("Home")} className="hover:underline hover:text-green-light">דף הבית</Link>
                </li>
                <li>
                  <Link to={createPageUrl("Catalog")} className="hover:underline hover:text-green-light">קטלוג מוצרים</Link>
                </li>
                <li>
                  <Link to={createPageUrl("Blog")} className="hover:underline hover:text-green-light">בלוג וטיפים</Link>
                </li>
                <li>
                  <Link to={createPageUrl("About")} className="hover:underline hover:text-green-light">אודות</Link>
                </li>
                <li>
                  <Link to={createPageUrl("Contact")} className="hover:underline hover:text-green-light">יצירת קשר</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 font-heebo">צרו קשר</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start space-x-2 space-x-reverse"> {/* Changed to items-start */}
                  <MapPin className="h-5 w-5 flex-shrink-0 mt-1" /> {/* Added mt-1 */}
                  <span>רחוב הציפורן 12, המושבה הירוקה</span>
                </li>
                <li className="flex items-center space-x-2 space-x-reverse">
                  <Phone className="h-5 w-5 flex-shrink-0" />
                  <a href="tel:04-9123456" className="hover:underline hover:text-green-light">04-9123456</a>
                </li>
                <li className="flex items-center space-x-2 space-x-reverse">
                  <Mail className="h-5 w-5 flex-shrink-0" />
                  <a href="mailto:info@lagan-velaganan.co.il" className="hover:underline hover:text-green-light">info@lagan-velaganan.co.il</a>
                </li>
                <li className="flex items-start space-x-2 space-x-reverse"> {/* Changed to items-start */}
                  <Clock className="h-5 w-5 flex-shrink-0 mt-1" /> {/* Added mt-1 */}
                  <div>
                    <p>א׳-ה׳: 8:00-19:00</p>
                    <p>ו׳: 8:00-14:00</p>
                    <p>שבת: 9:00-17:00</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-green-medium text-center text-xs"> {/* Reduced text size */}
            <p>© {new Date().getFullYear()} לגן ולגנן - כל הזכויות שמורות</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
