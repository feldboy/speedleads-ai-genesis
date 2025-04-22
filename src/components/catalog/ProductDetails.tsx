import type React from 'react'; // Use import type
import type { Product } from '../../entities/Product';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Sun, Droplets, ThermometerSnowflake, X } from 'lucide-react'; // Icons for attributes

interface ProductDetailsProps {
  product: Product | null; // Allow null when no product is selected
  onClose: () => void;
}

// Helper function to format attribute labels
const formatAttributeLabel = (type: 'sunlight' | 'waterNeeds' | 'difficulty', value: string | null | undefined): string => {
  if (!value) return 'לא צוין';
  switch (type) {
    case 'sunlight':
      return { full: 'שמש מלאה', partial: 'צל חלקי', shade: 'צל מלא' }[value] || value;
    case 'waterNeeds':
      return { low: 'נמוכה', medium: 'בינונית', high: 'גבוהה' }[value] || value;
    case 'difficulty':
      return { easy: 'קל', medium: 'בינוני', hard: 'קשה' }[value] || value;
    default:
      return value;
  }
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onClose }) => {
  if (!product) {
    return null; // Don't render anything if no product is selected
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose(); // Call onClose when the dialog is closed
    }
  };

  return (
    <Dialog open={!!product} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heebo">{product.name}</DialogTitle>
          {product.category && (
            <DialogDescription>
              קטגוריה: <Badge variant="secondary">{product.category.replace(/_/g, ' ')}</Badge> {/* Simple category format */}
            </DialogDescription>
          )}
           <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>

        <div className="flex-grow overflow-y-auto pr-2 -mr-2 py-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Image */}
          <div className="flex justify-center items-start">
             <img
               src={product.imageUrls?.[0] || product.stockImageUrl || 'https://via.placeholder.com/400x300?text=No+Image'}
               alt={product.name}
               className="rounded-lg object-cover max-h-[300px] w-auto"
               onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Image+Error'; }}
               loading="lazy"
             />
          </div>

          {/* Right Column: Details */}
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-1 text-garden-dark-green">תיאור</h4>
              <p className="text-sm text-gray-700">{product.description || 'אין תיאור זמין.'}</p>
            </div>

            <Separator />

            <div>
              <h4 className="font-semibold mb-2 text-garden-dark-green">מאפיינים</h4>
              <div className="space-y-1 text-sm">
                {product.sunlight && (
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4 text-yellow-500" />
                    <span>תנאי אור: <strong>{formatAttributeLabel('sunlight', product.sunlight)}</strong></span>
                  </div>
                )}
                {product.waterNeeds && (
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <span>צרכי מים: <strong>{formatAttributeLabel('waterNeeds', product.waterNeeds)}</strong></span>
                  </div>
                )}
                {product.difficulty && (
                  <div className="flex items-center gap-2">
                    <ThermometerSnowflake className="h-4 w-4 text-purple-500" /> {/* Placeholder icon */}
                    <span>רמת קושי: <strong>{formatAttributeLabel('difficulty', product.difficulty)}</strong></span>
                  </div>
                )}
                 <div className="flex items-center gap-2">
                    <span className={`font-bold ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                      {product.inStock ? 'במלאי' : 'אזל מהמלאי'}
                    </span>
                 </div>
              </div>
            </div>

            {product.careInstructions && (
              <>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-1 text-garden-dark-green">הוראות טיפול</h4>
                  <p className="text-sm text-gray-700">{product.careInstructions}</p>
                </div>
              </>
            )}

            {product.tags && product.tags.length > 0 && (
              <>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-2 text-garden-dark-green">תגיות</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <DialogFooter className="pt-4 border-t">
          <div className="flex justify-between items-center w-full">
             <span className="text-xl font-bold text-garden-medium-green">₪{product.price.toFixed(2)}</span>
             {/* Placeholder for Add to Cart or other actions */}
             <Button disabled={!product.inStock} className="garden-button">
               {product.inStock ? 'הוסף לעגלה' : 'אזל מהמלאי'}
             </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;
