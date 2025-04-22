
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Leaf } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center bg-garden-cream/50 py-20">
        <div className="text-center max-w-md mx-auto px-4">
          <Leaf className="h-20 w-20 text-garden-medium-green mx-auto mb-6 animate-gentle-sway" />
          <h1 className="text-6xl font-heebo font-bold text-garden-dark-green mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-6">אופס! הדף שחיפשת לא נמצא</p>
          <p className="text-gray-500 mb-8">
            ייתכן שהקישור שהקשת לא נכון, או שהדף הוסר. 
            אבל אל דאגה, יש לנו עוד הרבה צמחים יפים לראות!
          </p>
          <Link to="/" className="garden-button inline-flex items-center">
            <span className="ml-2">←</span>
            חזרה לדף הבית
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
