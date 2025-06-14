
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from '@/components/ui/carousel';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { cn } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
  website?: string;
}

const testimonials: Testimonial[] = [
  {
    id: "testimonial_2",
    quote: "האוטומציות שהוטמעו בעסק שלנו חסכו לנו שעות עבודה יקרות ושיפרו את חווית הלקוח באופן משמעותי.",
    author: "מיכל כהן",
    role: "סמנכ\"ל שיווק",
    company: "מרקט פרו",
    image: "/placeholder.svg"
  },
  {
    id: "testimonial_niv",
    quote: "SpeedLeads.AI בנתה עבורי אתר מקצועי ומדהים שממש הגדיל את הנוכחות הדיגיטלית שלי.",
    author: "ניב ראובני",
    role: "מרצה",
    company: "ניב ראובני",
    image: "/lovable-uploads/2e4fae97-83ec-48d9-8a2a-f2ce997f9785.png",
    website: "https://nivreuveni.com/"
  },
  {
    id: "testimonial_3",
    quote: "האינטגרציה של AI בחנות האונליין שלנו שינתה את חוקי המשחק והעלתה מכירות ב־30%.",
    author: "דן אבידן",
    role: "בעלים",
    company: "אלקטרו סטור",
    image: "/placeholder.svg"
  }
];

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <div
    className={cn(
      "flex flex-col justify-between overflow-hidden rounded-xl bg-dark h-full min-h-[310px] will-change-transform shadow-xl transition-all duration-300",
      "md:min-w-[370px] md:max-w-sm w-full mx-auto"
    )}
    style={{ opacity: 1, transform: "translate3d(0,0,0)" }}
  >
    <div className="p-6 pb-0 flex flex-col min-h-[160px]">
      <span className="mb-2 block text-xs font-bold text-tech-blue tracking-wide">{testimonial.company}</span>
      <h3 className="mb-0 font-heading text-base md:text-xl font-black text-white leading-snug">{testimonial.quote}</h3>
    </div>
    <div className="flex flex-col items-center gap-3 px-6 pb-6">
      <Avatar className="w-14 h-14 mb-2 shadow-md bg-gray-700">
        <AvatarImage src={testimonial.image} alt={testimonial.author} />
        <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
      </Avatar>
      <div className="text-center">
        <div className="font-semibold text-white">{testimonial.author}</div>
        <div className="text-xs text-gray-400">{testimonial.role}</div>
      </div>
      {testimonial.website &&
        <a
          href={testimonial.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-tech-blue hover:text-gold transition-colors inline-flex items-center mt-1"
          title="בקר באתר"
        >
          <ExternalLink className="w-4 h-4 mr-1" />
        </a>
      }
    </div>
  </div>
);

const TestimonialsSection = () => {
  return (
    <section id="clients" className="py-20 bg-gradient-to-b from-dark to-gray-900 text-white">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3" data-aos="fade-up">מה הלקוחות שלנו אומרים</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold to-tech-blue mx-auto mb-4" />
          <p className="text-lg text-gray-300 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            סיפורי הצלחה של לקוחות SpeedLeads.AI
          </p>
        </div>
        <div className="relative">
          <Carousel
            className="w-full max-w-5xl mx-auto"
            opts={{
              loop: true,
              align: "center"
            }}
          >
            <CarouselContent className="pt-2">
              {testimonials.map((t) => (
                <CarouselItem key={t.id} className="px-3">
                  <TestimonialCard testimonial={t} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious aria-label="המלצה קודמת" className="-right-4 left-auto top-1/2 -translate-y-1/2" />
            <CarouselNext aria-label="המלצה הבאה" className="-left-4 right-auto top-1/2 -translate-y-1/2" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
