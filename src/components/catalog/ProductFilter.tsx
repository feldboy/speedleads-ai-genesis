import type React from 'react'; // Use import type
import { useState } from 'react'; // Import useState directly
import { Search, X, SlidersHorizontal, RotateCcw } from 'lucide-react';
import type { ProductCategory, SunlightNeeds, WaterNeeds, DifficultyLevel } from '../../entities/Product';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet"; // For mobile filter drawer

// Define the shape of the filters
export interface ProductFilters {
  category: ProductCategory | "all";
  searchQuery: string;
  sunlight: SunlightNeeds | null;
  waterNeeds: WaterNeeds | null;
  difficulty: DifficultyLevel | null;
  inStockOnly: boolean;
}

interface ProductFilterProps {
  initialFilters: ProductFilters;
  onFilterChange: (newFilters: ProductFilters) => void;
  categories: { id: ProductCategory | "all"; name: string }[];
}

// Helper data for filter options (could be moved to constants file)
const sunlightOptions: { value: SunlightNeeds; label: string }[] = [
  { value: "full", label: "שמש מלאה" },
  { value: "partial", label: "צל חלקי" },
  { value: "shade", label: "צל מלא" },
];

const waterNeedsOptions: { value: WaterNeeds; label: string }[] = [
  { value: "low", label: "נמוכה" },
  { value: "medium", label: "בינונית" },
  { value: "high", label: "גבוהה" },
];

const difficultyOptions: { value: DifficultyLevel; label: string }[] = [
  { value: "easy", label: "קל" },
  { value: "medium", label: "בינוני" },
  { value: "hard", label: "קשה" },
];

// Helper function to render the filter controls (used by sidebar and sheet)
const renderFilterControls = (
  filters: ProductFilters,
  categories: { id: ProductCategory | "all"; name: string }[],
  // Provide a more specific type for the value parameter
  handleInputChange: (field: keyof ProductFilters, value: ProductFilters[keyof ProductFilters]) => void,
  handleCheckboxChange: (field: keyof ProductFilters, checked: boolean | 'indeterminate') => void,
  handleAttributeFilterChange: (field: 'sunlight' | 'waterNeeds' | 'difficulty', value: string | null) => void,
  resetFilters: () => void
) => (
   <div className="flex flex-col gap-6">
      {/* Search */}
      <div className="relative w-full">
         <Input
            type="text"
            placeholder="חיפוש צמחים..."
            className="w-full pr-10 rounded-md border-garden-light-green focus:ring-garden-medium-green" // Adjusted styling
            value={filters.searchQuery}
            onChange={(e) => handleInputChange('searchQuery', e.target.value)}
            aria-label="חיפוש צמחים"
         />
         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-garden-medium-green h-5 w-5" />
      </div>

      {/* Categories */}
      <div>
         <Label className="block mb-2 font-medium">קטגוריה</Label>
         <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
               <Button
                  key={category.id}
                  variant={filters.category === category.id ? "default" : "outline"}
                  size="sm"
                  className={`rounded-full ${filters.category === category.id ? 'bg-garden-dark-green text-white hover:bg-garden-dark-green/90' : 'bg-white text-garden-dark-green hover:bg-garden-light-green'}`}
                  onClick={() => handleInputChange('category', category.id)}
               >
                  {category.name}
               </Button>
            ))}
         </div>
      </div>

      {/* Additional Filters */}
      <div className="space-y-4">
         <h4 className="font-semibold text-garden-dark-green border-b pb-2">סינון נוסף</h4>

         {/* Sunlight Needs */}
         <div>
            <Label className="block mb-2 font-medium">תנאי אור</Label>
            <div className="flex flex-wrap gap-2">
               {sunlightOptions.map(opt => (
                  <Button key={opt.value} variant={filters.sunlight === opt.value ? 'secondary' : 'outline'} size="sm" onClick={() => handleAttributeFilterChange('sunlight', filters.sunlight === opt.value ? null : opt.value)}>
                     {opt.label} {filters.sunlight === opt.value && <X className="h-3 w-3 ml-1" />}
                  </Button>
               ))}
            </div>
         </div>

         {/* Water Needs */}
         <div>
            <Label className="block mb-2 font-medium">צרכי מים</Label>
            <div className="flex flex-wrap gap-2">
               {waterNeedsOptions.map(opt => (
                  <Button key={opt.value} variant={filters.waterNeeds === opt.value ? 'secondary' : 'outline'} size="sm" onClick={() => handleAttributeFilterChange('waterNeeds', filters.waterNeeds === opt.value ? null : opt.value)}>
                     {opt.label} {filters.waterNeeds === opt.value && <X className="h-3 w-3 ml-1" />}
                  </Button>
               ))}
            </div>
         </div>

         {/* Difficulty Level */}
         <div>
            <Label className="block mb-2 font-medium">רמת קושי</Label>
            <div className="flex flex-wrap gap-2">
               {difficultyOptions.map(opt => (
                  <Button key={opt.value} variant={filters.difficulty === opt.value ? 'secondary' : 'outline'} size="sm" onClick={() => handleAttributeFilterChange('difficulty', filters.difficulty === opt.value ? null : opt.value)}>
                     {opt.label} {filters.difficulty === opt.value && <X className="h-3 w-3 ml-1" />}
                  </Button>
               ))}
            </div>
         </div>

         {/* In Stock Only */}
         <div className="flex items-center space-x-2 pt-2">
            <Checkbox
               id="inStockOnly" // Use a single ID now
               checked={filters.inStockOnly}
               onCheckedChange={(checked) => handleCheckboxChange('inStockOnly', checked)}
            />
            <Label htmlFor="inStockOnly" className="cursor-pointer">
               הצג פריטים במלאי בלבד
            </Label>
         </div>
      </div>

      {/* Reset Button */}
      <Button variant="ghost" onClick={resetFilters} className="text-sm text-gray-600 hover:text-garden-dark-green self-start mt-4">
         <RotateCcw className="h-4 w-4 mr-1" />
         אפס סינון
      </Button>
   </div>
);


const ProductFilter: React.FC<ProductFilterProps> = ({ initialFilters, onFilterChange, categories }) => {
  const [filters, setFilters] = useState<ProductFilters>(initialFilters);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Define a more specific type for the value based on ProductFilters fields
  type FilterValue = ProductFilters[keyof ProductFilters];

  const handleInputChange = (field: keyof ProductFilters, value: FilterValue) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    // Optionally call onFilterChange immediately or provide an "Apply" button
    // For simplicity, calling immediately on desktop, apply button on mobile sheet
    // onFilterChange(newFilters); // Decide if immediate update is desired
  };

  const handleCheckboxChange = (field: keyof ProductFilters, checked: boolean | 'indeterminate') => {
    if (typeof checked === 'boolean') {
        handleInputChange(field, checked);
    }
  };

  const handleAttributeFilterChange = (field: 'sunlight' | 'waterNeeds' | 'difficulty', value: string | null) => {
     handleInputChange(field, value);
  };

  const resetFilters = () => {
    const defaultFilters: ProductFilters = {
        category: "all",
        searchQuery: "",
        sunlight: null,
        waterNeeds: null,
        difficulty: null,
        inStockOnly: false,
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters); // Update parent state on reset
    setIsSheetOpen(false); // Close sheet on reset
  };

  const applyFiltersFromSheet = () => {
    onFilterChange(filters);
    setIsSheetOpen(false);
  };

  // Removed the old renderFilters function as it's replaced by renderFilterControls

  return (
    <>
      {/* Desktop Sidebar Filters (visible on lg and up) */}
      {/* This div is now placed within the <aside> in Catalog.tsx */}
      {/* It provides the structure for the sidebar content */}
      <div className="hidden lg:block space-y-6">
         <h3 className="text-xl font-semibold font-heebo text-garden-dark-green border-b pb-2 mb-6">סינון מוצרים</h3>
         {renderFilterControls(
            filters,
            categories,
            handleInputChange,
            handleCheckboxChange,
            handleAttributeFilterChange,
            resetFilters
         )}
      </div>

      {/* Mobile Filter Trigger (visible below lg) */}
      {/* Changed breakpoint from md to lg */}
      <div className="lg:hidden bg-garden-cream py-3 sticky top-0 z-10 shadow-sm mb-6"> {/* Added mb-6 */}
        <div className="garden-container flex justify-end items-center"> {/* Removed search, only trigger button */}
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                סינון וחיפוש
              </Button>
            </SheetTrigger>
            {/* Changed side to right and adjusted width */}
            <SheetContent side="right" className="w-[300px] sm:w-[340px] flex flex-col">
              <SheetHeader className="p-4 border-b"> {/* Added padding and border */}
                <SheetTitle>סינון וחיפוש</SheetTitle>
              </SheetHeader>
              {/* Added padding */}
              <div className="flex-grow overflow-y-auto p-4">
                 {/* Render the common filter controls inside the sheet */}
                 {renderFilterControls(
                    filters,
                    categories,
                    handleInputChange,
                    handleCheckboxChange,
                    handleAttributeFilterChange,
                    resetFilters // Pass resetFilters here as well
                 )}
              </div>
              <SheetFooter className="p-4 border-t flex flex-row justify-between items-center">
                 {/* Keep Reset button, maybe rename */}
                 <Button variant="ghost" onClick={resetFilters} className="text-sm">
                    <RotateCcw className="h-4 w-4 mr-1" />
                    אפס הכל
                 </Button>
                 <SheetClose asChild>
                    <Button onClick={applyFiltersFromSheet}>הצג תוצאות</Button>
                 </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
};

export default ProductFilter;
