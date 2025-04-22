
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Leaf } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-garden-cream shadow-sm sticky top-0 z-50">
      <div className="garden-container">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="לגן ולגנן לוגו" className="h-12 object-contain" />
          </Link>

          {/* Desktop menu */}
          <nav className="hidden md:flex space-x-8 space-x-reverse">
            <Link to="/" className="text-garden-dark-green hover:text-garden-medium-green font-medium">דף הבית</Link>
            <Link to="/catalog" className="text-garden-dark-green hover:text-garden-medium-green font-medium">קטלוג צמחים</Link>
            <Link to="/blog" className="text-garden-dark-green hover:text-garden-medium-green font-medium">טיפים לגינון</Link>
            <Link to="/about" className="text-garden-dark-green hover:text-garden-medium-green font-medium">אודות</Link>
            <Link to="/contact" className="text-garden-dark-green hover:text-garden-medium-green font-medium">צרו קשר</Link>
          </nav>

          {/* Mobile menu button */}
          <button type="button" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? (
              <X className="h-6 w-6 text-garden-dark-green" />
            ) : (
              <Menu className="h-6 w-6 text-garden-dark-green" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-garden-cream py-4 animate-fade-in">
          <div className="garden-container flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-garden-dark-green hover:text-garden-medium-green font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              דף הבית
            </Link>
            <Link 
              to="/catalog" 
              className="text-garden-dark-green hover:text-garden-medium-green font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              קטלוג צמחים
            </Link>
            <Link 
              to="/blog" 
              className="text-garden-dark-green hover:text-garden-medium-green font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              טיפים לגינון
            </Link>
            <Link 
              to="/about" 
              className="text-garden-dark-green hover:text-garden-medium-green font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              אודות
            </Link>
            <Link 
              to="/contact" 
              className="text-garden-dark-green hover:text-garden-medium-green font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              צרו קשר
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
