
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
  website?: string;
  companyLogo?: string;
}

// Update these with real logo images for best aesthetics
const testimonials: Testimonial[] = [
  {
    id: "testimonial_2",
    quote:
      "האוטומציות שהוטמעו בעסק שלנו חסכו לנו שעות עבודה יקרות ושיפרו את חווית הלקוח באופן משמעותי.",
    author: "מיכל כהן",
    role: "סמנכ\"ל שיווק",
    company: "מרקט פרו",
    image: "/placeholder.svg",
    companyLogo: "/placeholder.svg",
  },
  {
    id: "testimonial_niv",
    quote:
      "SpeedLeads.AI בנתה עבורי אתר מקצועי ומדהים שממש הגדיל את הנוכחות הדיגיטלית שלי.",
    author: "ניב ראובני",
    role: "מרצה",
    company: "ניב ראובני",
    image: "/lovable-uploads/2e4fae97-83ec-48d9-8a2a-f2ce997f9785.png",
    website: "https://nivreuveni.com/",
    companyLogo: "/placeholder.svg",
  },
  {
    id: "testimonial_3",
    quote:
      "האינטגרציה של AI בחנות האונליין שלנו שינתה את חוקי המשחק והעלתה מכירות ב־30%.",
    author: "דן אבידן",
    role: "בעלים",
    company: "אלקטרו סטור",
    image: "/placeholder.svg",
    companyLogo: "/placeholder.svg",
  },
];

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <div
    className={cn(
      "flex flex-col justify-between overflow-hidden rounded-xl bg-dark will-change-transform shadow-xl transition-all duration-300 min-h-[350px]",
      // Responsive width - matches the design reference
      "px-2 py-5 tablet:p-7",
      "h-full"
    )}
    style={{ opacity: 1, transform: "translate3d(0,0,0)" }}
  >
    {/* Avatar at top center */}
    <div className="flex flex-col items-center gap-2">
      <Avatar className="w-16 h-16 mb-2 border-4 border-gold shadow-lg bg-gray-800">
        <AvatarImage src={testimonial.image} alt={testimonial.author} />
        <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
      </Avatar>
      <div className="text-center">
        <div className="text-lg font-bold text-white">{testimonial.author}</div>
        <div className="text-xs text-gray-400 font-medium">{testimonial.role}</div>
      </div>
      {testimonial.website && (
        <a
          href={testimonial.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-tech-blue hover:text-gold transition-colors inline-flex items-center mt-1"
          title="בקר באתר"
        >
          <ExternalLink className="w-4 h-4 mr-1" />
        </a>
      )}
    </div>
    {/* Quote - main content */}
    <div className="flex-1 flex flex-col justify-center text-center pt-3 pb-2">
      <h3 className="font-heading text-base font-black text-white leading-relaxed md:text-xl">{testimonial.quote}</h3>
    </div>
    {/* Logo/company section at the very bottom */}
    <div className="flex items-center justify-center mt-2">
      {testimonial.companyLogo ? (
        <img
          src={testimonial.companyLogo}
          alt={testimonial.company}
          className="h-8 w-auto object-contain rounded bg-white p-1 shadow"
        />
      ) : (
        <span className="text-gold text-sm font-semibold">{testimonial.company}</span>
      )}
    </div>
  </div>
);

const TestimonialsSection = () => {
  // Set visible count to 1 (mobile), 2 (tablet), or 3 (desktop)
  // embla-carousel-react supports "slidesToScroll" but shadcn/ui's Carousel uses flex, so use responsive utility widths
  // We'll handle widths in the CarouselItem: 100% on mobile, 50% on tablet, 33.33% on desktop
  return (
    <section id="clients" className="py-20 bg-gradient-to-b from-dark to-gray-900 text-white">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3" data-aos="fade-up">
            מה הלקוחות שלנו אומרים
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-gold to-tech-blue mx-auto mb-4" />
          <p
            className="text-lg text-gray-300 max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            סיפורי הצלחה של לקוחות SpeedLeads.AI
          </p>
        </div>
        <div className="relative">
          <Carousel
            className="w-full max-w-5xl mx-auto"
            opts={{
              loop: true,
              align: "start",
            }}
          >
            <CarouselContent className="pt-2">
              {testimonials.map((t, i) => (
                <CarouselItem
                  key={t.id}
                  // Responsive widths: 1 on mobile, 2 on tablet, 3 on desktop
                  className={cn(
                    "px-3",
                    "basis-full phone:basis-1/2 tablet:basis-1/2 laptop:basis-1/3 desktop:basis-1/3" // Tailwind: phone (≥640px), tablet (≥768px), laptop (≥1024px), desktop (≥1280px)
                  )}
                >
                  <TestimonialCard testimonial={t} />
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Position navigation arrows visually outside the row (Y aligned center) */}
            <CarouselPrevious aria-label="המלצה קודמת" className="-right-6 left-auto top-1/2 -translate-y-1/2 z-20" />
            <CarouselNext aria-label="המלצה הבאה" className="-left-6 right-auto top-1/2 -translate-y-1/2 z-20" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

