
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-garden-dark-green text-white py-12">
      <div className="garden-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-heebo font-bold mb-4">לגן ולגנן</h3>
            <p className="mb-4">משתלה משפחתית מלאת אהבה לצמחים ולאנשים. מגדלים באהבה, בשבילכם.</p>
            <div className="flex space-x-4 space-x-reverse mt-4">
              <a href="https://www.instagram.com/laganvlaganan/?hl=he" target="_blank" rel="noopener noreferrer" className="hover:text-garden-light-green transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-garden-light-green transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-heebo font-bold mb-4">ניווט מהיר</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-garden-light-green transition-colors">דף הבית</Link>
              </li>
              <li>
                <Link to="/catalog" className="hover:text-garden-light-green transition-colors">קטלוג צמחים</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-garden-light-green transition-colors">טיפים לגינון</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-garden-light-green transition-colors">אודות</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-garden-light-green transition-colors">צרו קשר</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-heebo font-bold mb-4">צרו קשר</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2 space-x-reverse">
                <Phone className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>04-1234567</span>
              </div>
              <div className="flex items-start space-x-2 space-x-reverse">
                <Mail className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>info@laganvelaganan.co.il</span>
              </div>
              <div className="flex items-start space-x-2 space-x-reverse">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>רחוב הפרחים 123, מושב הגנים, ישראל</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-xl font-heebo font-bold mb-4">שעות פתיחה</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Clock className="h-5 w-5 flex-shrink-0" />
                <div>
                  <p>ימים א'-ה': 8:00-19:00</p>
                  <p>יום ו': 8:00-14:00</p>
                  <p>שבת: סגור</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-garden-medium-green mt-8 pt-8 text-center">
          <p>© {new Date().getFullYear()} לגן ולגנן. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
