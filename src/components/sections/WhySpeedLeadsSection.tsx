
import React from 'react';

// Real image component with fallback
const FeatureImage = ({ src, alt, label }: { src: string; alt: string; label?: string }) => (
  <div className="w-full flex-1 flex items-end justify-center min-h-[120px] md:min-h-[180px]">
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover rounded-lg opacity-90 transition-opacity duration-300 hover:opacity-100"
      style={{ minHeight: '120px', maxHeight: '180px' }}
      loading="lazy"
      onError={(e) => {
        // Fallback to placeholder if image fails to load
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
        const fallback = target.parentElement?.querySelector('.fallback');
        if (fallback) {
          (fallback as HTMLElement).style.display = 'flex';
        }
      }}
    />
    <div className="fallback w-24 h-24 md:w-36 md:h-36 rounded-xl bg-gradient-to-br from-tech-blue via-gold to-dark flex items-center justify-center text-white text-sm opacity-80 shadow-glow-blue" style={{ display: 'none' }}>
      <span>{label || "Image"}</span>
    </div>
  </div>
);

const features = [
  {
    category: "הרחבת דפדפן",
    headline: "קל כמו צילום מסך",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop&crop=entropy&auto=format",
    alt: "Browser extension development",
    labelColor: "text-tech-blue",
  },
  {
    category: "שלבים אוטומטיים",
    headline: "לא תכתבו תיעוד ידני",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop&crop=entropy&auto=format",
    alt: "Automated processes and workflows",
    labelColor: "text-gold",
  },
  {
    category: "קסם שחזור מיידי",
    headline: "לתפוס כל מה שקרה",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop&crop=entropy&auto=format",
    alt: "Instant replay and recording magic",
    labelColor: "text-tech-blue",
  },
  {
    category: "עריכה ושיתוף",
    headline: "להוסיף, לטשטש ולשתף",
    imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=400&fit=crop&crop=entropy&auto=format",
    alt: "Editing and sharing tools",
    labelColor: "text-gold",
  },
];

const WhySpeedLeadsSection = () => (
  <section id="why-speedleads" className="py-20 bg-gradient-to-b from-gray-50 to-white">
    <div className="container mx-auto px-2">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4" data-aos="fade-up">
          למה SpeedLeads.AI?
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-gold to-tech-blue mx-auto mb-8" />
        <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
          פתרונות AI מתקדמים שחוסכים זמן, משפרים דיוק ומאפשרים לכם להתמקד במה שחשוב באמת
        </p>
      </div>
      <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
        {features.map((f, i) => (
          <div
            key={f.headline}
            className="flex flex-col justify-between overflow-hidden rounded-xl bg-dark will-change-transform shadow-xl min-h-[265px] md:min-h-[310px] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            style={{ opacity: 1, transform: "translate3d(0,0,0)" }}
            data-aos="fade-up"
            data-aos-delay={i*80}
          >
            <div className="p-5 pb-0 md:p-8 md:pb-0 flex flex-col">
              <span className={`mb-2 block font-bold text-xs md:text-sm ${f.labelColor}`} style={{letterSpacing: "0.05em"}}>
                {f.category}
              </span>
              <h3 className="mb-0 font-heading text-base md:text-2xl font-black text-white">
                {f.headline}
              </h3>
            </div>
            <FeatureImage src={f.imageUrl} alt={f.alt} label={f.category} />
          </div>
        ))}
      </div>
      <div className="text-center" data-aos="fade-up">
        <button
          type="button"
          id="why_speedleads_cta"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-tech-blue to-blue-500 hover:from-blue-500 hover:to-tech-blue text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        >
          בואו נתחיל לעבוד יחד
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 rtl:mr-0 rtl:ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
    </div>
  </section>
);

export default WhySpeedLeadsSection;
