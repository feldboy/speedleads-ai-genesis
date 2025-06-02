import React from 'react';

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: "testimonial_1",
    quote: "הצוות של SpeedLeads.AI הפך את החזון שלנו למציאות דיגיטלית מדהימה. האתר החדש לא רק נראה מדהים, אלא גם הביא לעלייה של 45% בלידים בחודש הראשון!",
    author: "רמי לוי",
    role: "מנכ\"ל",
    company: "לוי טכנולוגיות",
    image: "/placeholder.svg"
  },
  {
    id: "testimonial_2",
    quote: "האוטומציות שהוטמעו בעסק שלנו חסכו לנו שעות עבודה יקרות ושיפרו את חווית הלקוח באופן משמעותי. אני ממליץ בחום על SpeedLeads.AI לכל עסק שרוצה לצמוח.",
    author: "מיכל כהן",
    role: "סמנכ\"ל שיווק",
    company: "מרקט פרו",
    image: "/placeholder.svg"
  },
  {
    id: "testimonial_3",
    quote: "האינטגרציה של AI בחנות האונליין שלנו שינתה את חוקי המשחק. המכירות עלו ב-30%, וזמן השהייה באתר כמעט הוכפל. השקעה מצוינת!",
    author: "דן אבידן",
    role: "בעלים",
    company: "אלקטרו סטור",
    image: "/placeholder.svg"
  }
];

const TestimonialsSection = () => {
  return (
    <section id="clients" className="py-20 bg-gradient-to-b from-dark to-gray-900 text-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-aos="fade-up">מה הלקוחות שלנו אומרים</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gold to-tech-blue mx-auto mb-8" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            אנחנו נמדדים בהצלחה של לקוחותינו. הנה מה שיש להם לומר על העבודה איתנו
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id} 
              id={testimonial.id}
              className="bg-gray-800 rounded-lg p-8 relative transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-lg group" // Added group for hover effect on line
              data-aos="fade-up" 
              data-aos-delay={index * 100}
            >
              <div className="mb-6">
                <svg className="w-10 h-10 text-tech-blue opacity-30" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <title>Quote Icon</title>
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-gray-300 mb-6 flex-grow">{testimonial.quote}</p> {/* Added flex-grow for consistent height */}
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-600 mr-4 flex-shrink-0">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.author}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-tech-blue to-gold transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" /> {/* Changed origin, made self-closing */}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12" data-aos="fade-up">
          <button 
            type="button"
            id="view_all_testimonials_button"
            className="inline-flex items-center text-tech-blue hover:text-tech-blue/80 transition-colors font-semibold"
          >
            קרא עוד המלצות
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 rtl:mr-0 rtl:ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <title>Read More Arrow</title>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /> {/* Note: This arrow points left, might need d="M9 5l7 7-7 7" for right arrow in LTR context */}
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
