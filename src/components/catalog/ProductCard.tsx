import type React from 'react'; // Use import type for React
import type { Product } from '../../entities/Product'; // Import Product type

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const handleCardClick = () => {
    onClick(product);
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent card's onClick from firing when button is clicked
    onClick(product);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onClick(product);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Image+Error'; // Fallback image
  };

  return (
    <div
      key={product._id}
      role="button"
      tabIndex={0}
      className={`garden-card hover:shadow-lg cursor-pointer flex flex-col h-full ${!product.inStock ? 'opacity-60 relative' : ''}`} // Ensure flex column and full height
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
    >
      {!product.inStock && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
          אזל מהמלאי
        </div>
      )}
      <div className="h-48 overflow-hidden flex-shrink-0"> {/* Prevent image container from shrinking */}
        <img
          src={product.imageUrls?.[0] || product.stockImageUrl || 'https://via.placeholder.com/300x200?text=No+Image'}
          alt={product.name}
          className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
          onError={handleImageError}
          loading="lazy" // Add lazy loading for images
        />
      </div>
      <div className="p-4 flex flex-col flex-grow"> {/* Allow content to grow */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-heebo font-bold text-garden-dark-green">{product.name}</h3>
          <span className="font-bold text-garden-medium-green flex-shrink-0 ml-2">
            {typeof product.price === 'number' ? `₪${product.price.toFixed(2)}` : 'מחיר לא זמין'}
          </span> {/* Prevent price wrap and handle missing price */}
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{product.description || 'אין תיאור זמין'}</p> {/* Allow description to take space */}
        <button
          type="button"
          className="garden-button w-full mt-auto" // Push button to bottom
          onClick={handleButtonClick}
        >
          פרטים נוספים
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
