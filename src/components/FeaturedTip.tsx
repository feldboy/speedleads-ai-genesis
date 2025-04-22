
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

interface FeaturedTipProps {
  title: string;
  excerpt: string;
  date: string;
  imageSrc: string;
  link: string;
}

const FeaturedTip: React.FC<FeaturedTipProps> = ({
  title,
  excerpt,
  date,
  imageSrc,
  link
}) => {
  return (
    <div className="bg-garden-light-green/20 rounded-lg overflow-hidden">
      <div className="p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-heebo font-bold text-garden-dark-green mb-4">
          טיפ גינון החודש
        </h2>
        
        <div className="md:flex gap-6">
          <div className="md:w-1/3 mb-4 md:mb-0">
            <img 
              src={imageSrc} 
              alt={title} 
              className="w-full h-48 object-cover rounded-md"
            />
          </div>
          
          <div className="md:w-2/3">
            <div className="flex items-center text-garden-medium-green mb-2">
              <Calendar className="h-4 w-4 ml-1" />
              <span className="text-sm">{date}</span>
            </div>
            
            <h3 className="text-xl font-heebo font-bold text-garden-dark-green mb-2">
              {title}
            </h3>
            
            <p className="text-gray-600 mb-4">
              {excerpt}
            </p>
            
            <Link 
              to={link} 
              className="inline-flex items-center text-garden-dark-green hover:text-garden-medium-green font-medium"
            >
              להמשך קריאה
              <span className="mr-1">←</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedTip;
