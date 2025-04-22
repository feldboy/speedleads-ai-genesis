
import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{ 
          backgroundImage: "url('/hero-background.jpg')", // Updated path
          filter: "brightness(0.85)" // Keeping brightness filter for readability
        }}
      /> 
      
      {/* Overlay - Original Gradient */}
      <div className="absolute inset-0 bg-gradient-to-l from-black/40 to-transparent z-10" /> 
      
      {/* Content - Using container structure inspired by example */}
      <div className="container mx-auto px-4 h-full z-20 relative">
        {/* Removed items-end to allow the max-w-lg block to center within the container */}
        <div className="flex flex-col justify-center h-full"> 
          <div className="max-w-lg text-right animate-fade-in mx-auto"> {/* Added mx-auto to center the block, kept text-right */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heebo font-bold text-white mb-4 drop-shadow-lg"> {/* Added drop shadow */}
              לגן ולגנן
            </h1>
            <p className="text-xl md:text-2xl text-white mb-6 drop-shadow-md"> {/* Added drop shadow */}
              מגדלים באהבה, בשבילכם
            </p>
            <p className="text-lg text-white mb-8 drop-shadow-md"> {/* Added drop shadow */}
              משתלה משפחתית עם מבחר צמחים לבית ולגינה, ייעוץ מקצועי, ואווירה כפרית וחמה.
            </p>
            {/* Buttons remain aligned right within the text-right block */}
            <div className="flex space-x-4 space-x-reverse justify-end"> 
              <Link to="/catalog" className="garden-button bg-garden-medium-green hover:bg-garden-dark-green">
                לקטלוג הצמחים
              </Link> {/* Fixed missing closing tag */}
              <Link to="/contact" className="garden-button bg-white text-garden-dark-green hover:bg-garden-cream">
                בואו לבקר
              </Link>
            </div>
          </div> {/* Fixed missing closing tag */}
        </div> {/* Fixed missing closing tag */}
      </div> {/* Fixed missing closing tag */}
    </div>
  );
};

export default Hero;
