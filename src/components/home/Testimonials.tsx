import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from 'lucide-react'; // Using stars for rating visualization

interface Testimonial {
  id: string;
  name: string;
  text: string;
  location?: string; // Optional location
  imageUrl?: string; // Optional image URL
  rating?: number; // Optional rating (1-5)
}

// Mock testimonial data (adapted from original Index.tsx)
const mockTestimonials: Testimonial[] = [
  {
    id: 'test_1',
    name: "רונית כהן",
    text: "כבר שנים שאני קונה את הצמחים שלי במשתלת 'לגן ולגנן'. האיכות מעולה והצוות תמיד שמח לייעץ. המקום הפך לביקור שבועי קבוע בשבילי.",
    location: "רמת גן",
    imageUrl: "https://i.pravatar.cc/150?img=1", // Placeholder image
    rating: 5,
  },
  {
    id: 'test_2',
    name: "דני לוי",
    text: "גיליתי את המשתלה לפני שנה כשקניתי בית חדש. הצוות עזר לי לתכנן את הגינה מאפס, והתוצאה מדהימה! בכל פעם שאני צריך משהו, אני חוזר אליהם.",
    location: "הרצליה",
    imageUrl: "https://i.pravatar.cc/150?img=3", // Placeholder image
    rating: 5,
  },
  {
    id: 'test_3',
    name: "מיכל אברהם",
    text: "האווירה במשתלה פשוט קסומה. הצוות מקצועי, הצמחים איכותיים והמחירים הוגנים. יש סיבה שהם הפכו למוסד באזור!",
    location: "כפר סבא",
    imageUrl: "https://i.pravatar.cc/150?img=5", // Placeholder image
    rating: 4,
  }
];

// Helper to get initials from name for Avatar fallback
const getInitials = (name: string): string => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

const Testimonials: React.FC = () => {
  // In a real app, you'd fetch this data
  const testimonials = mockTestimonials;

  return (
    // Using garden-section and garden-container for consistency
    // Added bg-garden-light-green/10 as per original Index.tsx
    <section className="garden-section bg-garden-light-green/10 py-16"> 
      <div className="garden-container">
        <h2 className="text-3xl font-heebo font-bold text-garden-dark-green mb-12 text-center">
          מה הלקוחות שלנו חושבים
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
              <CardContent className="p-6 flex flex-col items-center text-center flex-grow">
                <Avatar className="w-20 h-20 mb-4 border-2 border-garden-medium-green">
                  <AvatarImage src={testimonial.imageUrl} alt={testimonial.name} />
                  <AvatarFallback className="bg-garden-light-green text-garden-dark-green font-semibold">
                    {getInitials(testimonial.name)}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-heebo font-semibold text-garden-dark-green mb-1">
                  {testimonial.name}
                </h3>
                {testimonial.location && (
                  <p className="text-sm text-gray-500 mb-4">{testimonial.location}</p>
                )}
                {testimonial.rating && (
                  <div className="flex justify-center mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                )}
                <blockquote className="text-gray-600 italic leading-relaxed flex-grow">
                  "{testimonial.text}"
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
