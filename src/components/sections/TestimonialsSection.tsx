import React from "react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

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

// Demo testimonials. Update images/logos to match your design.
const testimonials: Testimonial[] = [
  {
    id: "testimonial_2",
    quote:
      "האוטומציות שהוטמעו בעסק שלנו חסכו לנו שעות עבודה יקרות ושיפרו את חווית הלקוח באופן משמעותי.",
    author: "מיכל כהן",
    role: 'סמנכ"ל שיווק',
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
      "flex h-full w-full flex-col rounded-3xl bg-dark px-4 py-6 font-sans tablet:p-10 shadow-xl transition-all duration-300"
    )}
  >
    <div className="mx-auto mb-4 flex h-[80px] w-[80px] justify-center overflow-hidden rounded-[50%] bg-gray-700">
      <img
        alt={testimonial.author}
        src={testimonial.image}
        width={80}
        height={80}
        className="object-cover w-[80px] h-[80px]"
        loading="lazy"
      />
    </div>
    <span className="mb-2 text-[16px] font-medium text-white text-center">
      {testimonial.author}
    </span>
    <span className="mb-8 text-[14px] text-[#8B94A3] text-center">
      {testimonial.role}
    </span>
    <div className="flex flex-col flex-grow justify-between">
      <blockquote className="mb-8 text-[16px] text-white text-center leading-relaxed">
        {testimonial.quote}
      </blockquote>
      <div className="mx-auto flex items-center justify-center text-white h-14 mt-auto">
        {testimonial.companyLogo ? (
          <img
            src={testimonial.companyLogo}
            alt={testimonial.company}
            className="h-10 w-auto object-contain rounded bg-white p-1 shadow"
            style={{ maxWidth: 120 }}
            loading="lazy"
          />
        ) : (
          <span className="text-white text-base font-semibold">
            {testimonial.company}
          </span>
        )}
      </div>
    </div>
  </div>
);

const TestimonialsSection = () => {
  return (
    <section
      id="clients"
      className="py-20 bg-gradient-to-b from-dark to-gray-900 text-white"
    >
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2
            className="text-3xl md:text-4xl font-bold mb-3"
            data-aos="fade-up"
          >
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
        <div className="relative max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((t) => (
                <CarouselItem
                  key={t.id}
                  className="
                    px-2
                    mobile:basis-full
                    tablet:basis-1/2
                    laptop:basis-1/3
                  "
                >
                  <TestimonialCard testimonial={t} />
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Navigation Buttons (outside content for overlay) */}
            <CarouselPrevious className="absolute z-10 left-2 sm:left-[-1rem] md:left-[-2rem] top-1/2 -translate-y-1/2 bg-slate-800/50 hover:bg-slate-700/50 border-slate-700 text-white" />
            <CarouselNext className="absolute z-10 right-2 sm:right-[-1rem] md:right-[-2rem] top-1/2 -translate-y-1/2 bg-slate-800/50 hover:bg-slate-700/50 border-slate-700 text-white" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
