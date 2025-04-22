// Defines the structure for a Product document based on the MongoDB schema

// Define allowed categories
export type ProductCategory =
  | "herbs_vegetables"
  | "pots_planters"
  | "outdoor_plants"
  | "indoor_plants"
  | "trees_shrubs"
  | "gardening_tools"
  | "soil_fertilizers";

// Define allowed plant-specific attributes
export type SunlightNeeds = "full" | "partial" | "shade";
export type WaterNeeds = "high" | "medium" | "low";
export type DifficultyLevel = "easy" | "medium" | "hard";

export interface Product {
  _id: string; // Typically mapped from MongoDB ObjectId

  name: string;
  category: ProductCategory;
  description?: string;
  careInstructions?: string;
  imageUrls?: string[]; // Changed to array as recommended
  stockImageUrl?: string; // URL for a default/stock image
  price: number;
  isFeatured?: boolean;
  inStock?: boolean;
  tags?: string[];

  // Plant-specific attributes (optional)
  sunlight?: SunlightNeeds | null;
  waterNeeds?: WaterNeeds | null;
  difficulty?: DifficultyLevel | null;

  // Standard Timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

// Note: The actual MongoDB schema definition and indexing
// would typically be handled in the backend code (e.g., using Mongoose or a similar ODM)
// or directly via MongoDB commands/scripts. This interface serves as the TypeScript
// representation for frontend or backend application logic.
