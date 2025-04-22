import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    // Using garden-section and garden-container for consistency
    // Added bg-garden-cream as per original Index.tsx structure
    <section className="garden-section bg-garden-cream py-16"> 
      <div className="garden-container">
        <div className="md:flex items-center gap-12"> {/* Increased gap */}
          {/* Image Section */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img 
              // Using the same image as the original Index.tsx for consistency
              src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80" 
              alt="המשפחה שלנו במשתלה" 
              className="rounded-lg shadow-lg w-full h-auto object-cover aspect-video" // Added aspect ratio
            />
          </div>
          
          {/* Text Section */}
          <div className="md:w-1/2">
            <h2 className="text-3xl font-heebo font-bold text-garden-dark-green mb-4">
              המשפחה שלנו
            </h2>
            
            <p className="text-gray-700 mb-4 leading-relaxed"> {/* Adjusted text color and leading */}
              כבר למעלה מ-20 שנה שמשפחת ישראלי מגדלת ומטפחת באהבה את משתלת "לגן ולגנן". מה שהתחיל כחלום קטן בלב היישוב הכפרי שלנו, צמח והפך למשתלה המובילה והאהובה באזור, מקום של ירוק ושלווה.
            </p>
            
            <p className="text-gray-700 mb-6 leading-relaxed"> {/* Adjusted text color and leading */}
              אנו מאמינים שכל צמח, ממש כמו כל אדם, זקוק לתשומת לב, אהבה וטיפול אישי. לכן, אנו מגדלים את הצמחים שלנו במסירות ובקפידה, ומעניקים לכל לקוח ייעוץ מקצועי וחם מהלב, כדי שגם אתם תוכלו להנות מגינה פורחת.
            </p>
            
            <Link to="/about" className="garden-button inline-block"> {/* Ensure button styles apply */}
              קראו עוד על הסיפור שלנו
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
