
import React from 'react';
import { Link } from 'react-router-dom';

interface ProductCategoryProps {
  title: string;
  description: string;
  imageSrc: string;
  link: string;
}

const ProductCategory: React.FC<ProductCategoryProps> = ({
  title,
  description,
  imageSrc,
  link
}) => {
  return (
    <div className="garden-card hover:scale-[1.02] transition-transform">
      <div className="h-48 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-heebo font-bold text-garden-dark-green mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link to={link} className="garden-button inline-block">
          לצפייה
        </Link>
      </div>
    </div>
  );
};

export default ProductCategory;
