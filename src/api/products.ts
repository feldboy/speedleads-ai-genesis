import type { Product } from '../entities/Product';

// Use relative path for API calls, works for both dev and Vercel deployment
const API_BASE_PATH = '/api';

/**
 * Fetches the list of products from the backend API.
 * @returns A promise that resolves with an array of Product objects.
 */
export const fetchProductsApi = async (): Promise<Product[]> => {
  console.log("Fetching products from backend API...");
  try {
    const response = await fetch(`${API_BASE_PATH}/products`);
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
    const products: Product[] = await response.json();
    console.log("Successfully fetched products.");
    return products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    // Re-throw the error to be handled by the calling component (e.g., display an error message)
    throw error;
  }
};
