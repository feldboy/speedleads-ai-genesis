// Defines the structure for a Blog Post

export interface BlogPostData {
  id: string; // Mapped from MongoDB _id
  title: string;
  summary: string;
  author: string;
  publishDate: string; // Consider using Date type if more manipulation is needed
  imageUrl: string;
  featured?: boolean;
  link: string;
  // MongoDB adds _id automatically, we map it to 'id' in the backend server
}

// Use relative path for API calls
const API_BASE_PATH = '/api';

/**
 * Fetches the list of blog posts from the backend API.
 * @returns A promise that resolves with an array of BlogPostData objects.
 */
const list = async (): Promise<BlogPostData[]> => {
  console.log("Fetching blog posts from backend API...");
  try {
    const response = await fetch(`${API_BASE_PATH}/blogposts`);
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
    const blogPosts: BlogPostData[] = await response.json();
    console.log("Successfully fetched blog posts.");
    // Note: Filtering (e.g., for featured posts) could be done here
    // or ideally by adding query parameters to the backend API endpoint
    // For now, returning all posts fetched.
    return blogPosts;
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    // Re-throw the error to be handled by the calling component
    throw error;
  }
};

export const BlogPost = {
  list,
};
