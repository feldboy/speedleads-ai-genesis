
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ServiceSlideProps {
  title: string;
  description: string;
  backgroundImage: string;
  id: string;
}

const ServiceSlide = ({ title, description, backgroundImage, id }: ServiceSlideProps) => (
  <div 
    className="relative h-96 md:h-80 flex items-center justify-center overflow-hidden rounded-lg"
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    {/* Dark overlay for text readability */}
    <div className="absolute inset-0 bg-black/50" />
    
    {/* Content */}
    <div className="relative z-10 text-center text-white px-6 max-w-2xl">
      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-shadow">{title}</h3>
      <p className="text-lg mb-6 leading-relaxed text-shadow">{description}</p>
      <Button 
        id={id}
        variant="outline" 
        className="border-white text-white hover:bg-white hover:text-dark bg-transparent backdrop-blur-sm"
      >
        למידע נוסף
      </Button>
    </div>
  </div>
);

const ServiceCarousel = () => {
  const services = [
    {
      title: "אתרים שחושבים קדימה",
      description: "עיצוב ובניית אתרי תדמית ומסחר מרהיבים, מותאמים אישית, עם ביצועים שממירים ומבוססים על מנועי בינה מלאכותית מתקדמים.",
      backgroundImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&h=800&fit=crop",
      id: "service_learn_more_websitebuilding"
    },
    {
      title: "דפי נחיתה שהופכים קליקים ללקוחות",
      description: "יצירת דפי נחיתה ממוקדים ואפקטיביים, מבוססי דאטה ו-AI, לקמפיינים שמביאים תוצאות מדידות ולידים איכותיים.",
      backgroundImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=800&fit=crop",
      id: "service_learn_more_landingpages"
    },
    {
      title: "מסחר אלקטרוני מהדור הבא",
      description: "הקמת חנויות אונליין מתקדמות עם חווית משתמש אישית, אוטומציות, ואינטגרציות AI למקסום מכירות וניהול מלאי חכם.",
      backgroundImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=800&fit=crop",
      id: "service_learn_more_ecommerce"
    },
    {
      title: "חברו את העסק שלכם לעוצמה של AI",
      description: "שילוב כלי AI מתקדמים (צ'אטבוטים, ניתוח נתונים, פרסונליזציה) במערכות הקיימות שלכם לשיפור חווית המשתמש וייעול תהליכים.",
      backgroundImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=800&fit=crop",
      id: "service_learn_more_aiintegrations"
    },
    {
      title: "ייעול תהליכים, חיסכון בזמן",
      description: "פיתוח והטמעת אוטומציות חכמות לתהליכים עסקיים, שיווקיים ותפעוליים – מותאמות בדיוק לצרכים הייחודיים של העסק שלכם.",
      backgroundImage: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=1200&h=800&fit=crop",
      id: "service_learn_more_automations"
    },
    {
      title: "תמיכה ותחזוקה ארוכת טווח",
      description: "אנחנו לא נעלמים אחרי השקת הפרויקט. הצוות שלנו ממשיך ללוות אתכם עם תמיכה, שדרוגים ושיפורים מתמשכים לפתרון שלכם.",
      backgroundImage: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=1200&h=800&fit=crop",
      id: "service_learn_more_support"
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-aos="fade-up">השירותים שלנו</h2>
          <div className="w-24 h-1 bg-gradient-to-l from-[#00f6ff] to-[#00a7ff] mx-auto mb-8" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            אנחנו מספקים מגוון פתרונות דיגיטליים מתקדמים המותאמים לצרכים הייחודיים של העסק שלכם
          </p>
        </div>
        
        <div className="relative max-w-5xl mx-auto" data-aos="fade-up" data-aos-delay="200">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="gap-4">
              {services.map((service, index) => (
                <CarouselItem key={index} className="pl-0">
                  <ServiceSlide
                    title={service.title}
                    description={service.description}
                    backgroundImage={service.backgroundImage}
                    id={service.id}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ServiceCarousel;
