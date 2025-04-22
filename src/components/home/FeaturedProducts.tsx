import type React from 'react';
import { useState, useEffect } from 'react';
import type { Product } from '@/entities/Product'; // Use type import
import { fetchProductsApi } from '@/api/products'; // Import the API function
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"; // Need Skeleton for loading state
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Need Alert for error state
import { Terminal } from "lucide-react"; // Need Icon for Alert
import { Link } from 'react-router-dom'; // For linking to product details or catalog

// Removed placeholder data
// const placeholderProducts: Product[] = [ ... ];


const FeaturedProducts: React.FC = () => {
  // Add state for products, loading, and error
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products when component mounts
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch only featured products by calling the API with the filter
        // Note: fetchProductsApi needs to be adapted or a new function created
        // For simplicity here, we assume fetchProductsApi can take a filter object or query string
        // Let's modify fetchProductsApi first.
        // --- TEMPORARY: Assuming fetchProductsApi is modified ---
        // const featuredProducts = await fetchProductsApi({ featured: true });

        // --- Use relative path for API call ---
        const response = await fetch('/api/products?featured=true'); // Fetch featured products
         if (!response.ok) {
           // Try to parse error message from backend, otherwise use status text
           let errorMessage = `HTTP error! status: ${response.status}`;
           try {
             const errorData = await response.json();
             errorMessage = errorData.message || errorMessage;
           } catch (parseError) {
             // Ignore if response body is not JSON or empty
           }
           throw new Error(errorMessage);
         }
        const featuredProducts: Product[] = await response.json();

        // Display fetched featured products (up to 4 for layout consistency)
        setProducts(featuredProducts.slice(0, 4));
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        console.error("Error in FeaturedProducts:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Function to render loading skeletons
  const renderSkeletons = () => (
    Array.from({ length: 4 }).map((_, index) => (
      // Using index as key for this static list of skeletons.
      // biome-ignore lint/suspicious/noArrayIndexKey: Index is acceptable for static skeleton list.
      <Card key={index} className="flex flex-col overflow-hidden">
        <Skeleton className="w-full h-48" />
        <CardContent className="p-4 flex-grow">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full mt-1" />
        </CardContent>
        <CardFooter className="p-4 flex justify-between items-center bg-gray-50">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-8 w-1/4" />
        </CardFooter>
      </Card>
    ))
  );

  const renderProducts = () => (
    // Use fetched products state
    products.map((product) => (
      <Card key={product._id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="p-0">
          <img
            // Use first image from array, stock image, or placeholder
            src={product.imageUrls?.[0] || product.stockImageUrl || '/placeholder.svg'}
            alt={product.name}
            className="w-full h-48 object-cover" // Ensure consistent height
          />
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-xl font-heebo font-semibold mb-1 text-garden-dark-green">{product.name}</CardTitle>
          <CardDescription className="text-sm text-gray-500 mb-3">{product.category}</CardDescription>
          {/* Use optional chaining for description */}
          <p className="text-gray-700 text-sm line-clamp-3">{product.description ?? 'No description available.'}</p>
        </CardContent>
        <CardFooter className="p-4 flex justify-between items-center bg-gray-50">
          <span className="text-lg font-semibold text-garden-dark-green">₪{product.price.toFixed(2)}</span>
          <Link to="/catalog"> {/* Consider linking to specific product page later */}
            <Button variant="outline" size="sm" className="garden-button-outline" disabled={!product.inStock}>
              {product.inStock ? 'לפרטים' : 'אזל המלאי'}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    ))
  );


  return (
    <section className="garden-section">
      <div className="garden-container">
        <h2 className="text-3xl font-heebo font-bold text-garden-dark-green mb-8 text-center">
          מוצרים נבחרים
        </h2>

        {/* Add Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <Terminal className="h-4 w-4" />
            <AlertTitle>שגיאה בטעינת מוצרים</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Add loading check and render skeletons or products */}
          {isLoading ? renderSkeletons() : renderProducts()}
        </div>

        {/* Add conditional rendering based on loading/error/data */}
        {!isLoading && !error && products.length === 0 && (
           <p className="text-center text-gray-500 mt-8">לא נמצאו מוצרים נבחרים כרגע.</p>
        )}

        {/* Show "All Products" button only if not loading and no error */}
        {!isLoading && !error && products.length > 0 && (
          <div className="text-center mt-12">
            <Link to="/catalog" className="garden-button">
              לכל המוצרים
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
