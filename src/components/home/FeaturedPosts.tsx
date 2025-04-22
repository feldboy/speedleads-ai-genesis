import React, { useState, useEffect } from 'react';
import { BlogPost, BlogPostData } from '@/entities/BlogPost';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, Calendar, User } from "lucide-react"; // Icons
import { Link } from 'react-router-dom';
import { format } from 'date-fns'; // For formatting the date

const FeaturedPosts: React.FC = () => {
  const [posts, setPosts] = useState<BlogPostData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const featuredPosts = await BlogPost.list();
        // Ensure we only take up to 2 posts as per requirement
        setPosts(featuredPosts.slice(0, 2)); 
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Helper to format date string
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd MMMM, yyyy'); // e.g., 10 April, 2025
    } catch {
      return dateString; // Fallback to original string if parsing fails
    }
  };

  const renderSkeletons = () => (
    Array.from({ length: 2 }).map((_, index) => (
      <Card key={`skeleton-post-${index}`} className="flex flex-col md:flex-row overflow-hidden">
        <Skeleton className="h-48 w-full md:w-1/3 flex-shrink-0" />
        <div className="p-4 flex flex-col flex-grow">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-1" />
          <Skeleton className="h-4 w-5/6 mb-4" />
          <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500 mb-4">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-1/3" />
          </div>
          <div className="mt-auto">
            <Skeleton className="h-9 w-1/4" />
          </div>
        </div>
      </Card>
    ))
  );

  const renderPosts = () => (
    posts.map((post) => (
      <Card key={post.id} className="flex flex-col md:flex-row overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <img 
          src={post.imageUrl || '/placeholder.svg'} 
          alt={post.title} 
          className="h-48 w-full md:w-1/3 object-cover flex-shrink-0" 
        />
        <div className="p-6 flex flex-col flex-grow">
          <CardTitle className="text-xl font-heebo font-semibold mb-2 text-garden-dark-green">{post.title}</CardTitle>
          <p className="text-gray-700 text-sm mb-4 flex-grow">{post.summary}</p>
          <div className="flex items-center space-x-4 space-x-reverse text-xs text-gray-500 mb-4">
            <span className="flex items-center">
              <User className="w-3 h-3 mr-1" /> {post.author}
            </span>
            <span className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" /> {formatDate(post.publishDate)}
            </span>
          </div>
          <div className="mt-auto">
            <Link to={post.link}>
              <Button variant="link" size="sm" className="p-0 h-auto text-garden-medium-green hover:text-garden-dark-green">
                קראו עוד &rarr;
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    ))
  );

  return (
    <section className="garden-section">
      <div className="garden-container">
        <h2 className="text-3xl font-heebo font-bold text-garden-dark-green mb-8 text-center">
          מהבלוג שלנו
        </h2>

        {error && (
          <Alert variant="destructive" className="mb-8">
            <Terminal className="h-4 w-4" />
            <AlertTitle>שגיאה בטעינת הפוסטים</AlertTitle>
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 gap-8"> {/* Changed to single column grid for better layout */}
          {isLoading ? renderSkeletons() : renderPosts()}
        </div>
        
        {!isLoading && !error && posts.length === 0 && (
           <p className="text-center text-gray-500 mt-8">לא נמצאו פוסטים נבחרים כרגע.</p>
        )}

        {!isLoading && !error && posts.length > 0 && (
          <div className="text-center mt-12">
            <Link to="/blog" className="garden-button">
              לכל הפוסטים בבלוג
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedPosts;
