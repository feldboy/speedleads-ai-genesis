import React, { useState, useEffect } from 'react'; // Removed useCallback
import { useQuery } from '@tanstack/react-query'; // Import useQuery
import { Leaf, AlertCircle, RefreshCw } from 'lucide-react';
import type { Product, ProductCategory } from '../entities/Product'; // Use type import for Product types
import { fetchProductsApi } from '../api/products'; // Import the API function
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from '../components/catalog/ProductCard';
import ProductFilter, { type ProductFilters } from '../components/catalog/ProductFilter'; // Use type import for ProductFilters
import ProductDetails from '../components/catalog/ProductDetails';

const Catalog = () => {
  // Fetch products using react-query
  const {
    data: products = [], // Default to empty array while loading/error
    isLoading,
    isError,
    error: queryError, // Rename error to avoid conflict
    refetch // Function to manually refetch data
  } = useQuery<Product[], Error>({ // Specify types for data and error
    queryKey: ['products'], // Unique key for this query
    queryFn: fetchProductsApi, // The function that fetches data
    // Optional: Add configuration like staleTime, cacheTime etc.
    // staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // State for details view

  // Centralized filter state
  const [filters, setFilters] = useState<ProductFilters>({
    category: "all",
    searchQuery: "",
    sunlight: null,
    waterNeeds: null,
    difficulty: null,
    inStockOnly: false,
  });

  // Define categories based on ProductCategory type (passed to filter component)
  const categoriesForFilter: { id: ProductCategory | "all"; name: string }[] = [
    { id: "all", name: "הכל" },
    { id: "indoor_plants", name: "צמחי בית" },
    { id: "outdoor_plants", name: "צמחי גינה" },
    { id: "herbs_vegetables", name: "תבלינים וירקות" },
    { id: "trees_shrubs", name: "עצים ושיחים" },
    { id: "pots_planters", name: "עציצים ואדניות" },
    { id: "gardening_tools", name: "כלי גינון" },
    { id: "soil_fertilizers", name: "אדמה ודשנים" },
  ];

  // Filter products based on the filters state and data from react-query
  useEffect(() => {
    // Ensure products data is available before filtering
    if (!products) {
      setFilteredProducts([]);
      return;
    }

    let tempFiltered = products;

    if (filters.category !== "all") {
      tempFiltered = tempFiltered.filter(product => product.category === filters.category);
    }

    if (filters.searchQuery.trim() !== "") {
      const lowerCaseQuery = filters.searchQuery.toLowerCase();
      tempFiltered = tempFiltered.filter(product =>
        product.name.toLowerCase().includes(lowerCaseQuery) ||
        (product.description?.toLowerCase().includes(lowerCaseQuery))
      );
    }

    if (filters.sunlight) {
      tempFiltered = tempFiltered.filter(product => product.sunlight === filters.sunlight);
    }

    if (filters.waterNeeds) {
      tempFiltered = tempFiltered.filter(product => product.waterNeeds === filters.waterNeeds);
    }

    if (filters.difficulty) {
      tempFiltered = tempFiltered.filter(product => product.difficulty === filters.difficulty);
    }

    if (filters.inStockOnly) {
      tempFiltered = tempFiltered.filter(product => product.inStock === true);
    }

    setFilteredProducts(tempFiltered);
  }, [filters, products]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
  };

  const handleFilterChange = (newFilters: ProductFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      {/* Hero Banner */}
      <div className="bg-garden-dark-green text-white py-12">
        <div className="garden-container text-center">
          <h1 className="text-4xl font-heebo font-bold mb-4">קטלוג צמחים</h1>
          <p className="text-xl max-w-2xl mx-auto">
            במשתלת לגן ולגנן תוכלו למצוא מגוון רחב של צמחים וכל מה שתצטרכו לגינון מוצלח.
            צוות המומחים שלנו ישמח לסייע לכם בבחירת הצמחים המתאימים.
          </p>
        </div>
      </div>

      {/* Main Content Area: Filters + Products Grid */}
      <div className="garden-container garden-section lg:grid lg:grid-cols-[1fr_288px] lg:gap-8">

        {/* Products Grid Section (Left Column on LG+) */}
        <section className="lg:col-start-1">
          {isLoading ? ( // Use isLoading from useQuery
            // Loading State - Skeleton Grid
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"> {/* Adjusted grid cols for main area */}
              {Array.from({ length: 8 }).map((_, index) => (
                // Using a more stable key than just index
                <div key={`catalog-skeleton-${index}`} className="border rounded-lg overflow-hidden shadow-sm">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : isError ? ( // Use isError from useQuery
            // Error State
            <div className="text-center py-12 text-red-600 bg-red-50 p-6 rounded-lg border border-red-200">
              <AlertCircle className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-2xl font-heebo font-bold mb-2">אופס! משהו השתבש</h3>
              {/* Display error message from queryError */}
              <p className="mb-4">{queryError?.message || "An unknown error occurred."}</p>
              <button
                type="button"
                onClick={() => refetch()} // Use refetch from useQuery
                className="garden-button bg-red-600 hover:bg-red-700 text-white inline-flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                נסה שוב
              </button>
            </div>
          ) : filteredProducts.length === 0 ? (
            // No Results State
            <div className="text-center py-12">
              <Leaf className="h-12 w-12 text-garden-medium-green mx-auto mb-4" />
              <h3 className="text-2xl font-heebo font-bold text-garden-dark-green mb-2">לא נמצאו צמחים</h3>
              <p className="text-gray-600">
                לא נמצאו צמחים התואמים את הסינון או החיפוש שלך. נסו לשנות את ההגדרות.
              </p>
            </div>
          ) : (
            // Products Grid - Using ProductCard component
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"> {/* Adjusted grid cols for main area */}
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onClick={handleProductClick}
                />
              ))}
            </div>
          )}
        </section>

        {/* Filter Sidebar (Right Column on LG+) */}
        {/* The existing mobile filter trigger is inside ProductFilter */}
        {/* We render ProductFilter here, it will handle its own mobile/desktop display */}
        <aside className="lg:col-start-2 lg:row-start-1"> {/* Place sidebar in the grid */}
           {/* Consider adding lg:sticky lg:top-[value] here if needed, adjust value based on header */}
           <ProductFilter
             initialFilters={filters}
             onFilterChange={handleFilterChange}
             categories={categoriesForFilter}
           />
        </aside>

      </div> {/* End Main Content Area Grid */}


      {/* Call to Action Section (Optional) */}
      <section className="garden-section bg-garden-light-green/20 lg:col-span-2"> {/* Ensure CTA spans full width if inside grid, or move outside */}
        <div className="garden-container text-center">
          <h2 className="text-2xl font-heebo font-bold text-garden-dark-green mb-4">
            לא מצאתם את מה שחיפשתם?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            אנחנו מחדשים את המלאי שלנו כל הזמן ויכולים להזמין עבורכם צמחים מיוחדים.
            צרו איתנו קשר וצוות המומחים שלנו ישמח לעזור לכם למצוא בדיוק את מה שאתם צריכים.
          </p>
          <button type="button" className="garden-button">
            צרו קשר לייעוץ אישי
          </button>
        </div>
      </section>

      {/* Render ProductDetails when a product is selected */}
      <ProductDetails product={selectedProduct} onClose={handleCloseDetails} />
    </>
  );
};

export default Catalog;
