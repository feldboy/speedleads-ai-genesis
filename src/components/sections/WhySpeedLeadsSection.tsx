
import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  gradient: string;
  icon: React.ReactNode;
}

const FeatureCard = ({ title, description, gradient, icon }: FeatureCardProps) => (
  <div 
    className={`relative overflow-hidden rounded-2xl p-8 text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl ${gradient}`}
    data-aos="fade-up"
  >
    <div className="relative z-10">
      <div className="mb-6 text-white/90">{icon}</div>
      <h3 className="text-xl md:text-2xl font-bold mb-4">{title}</h3>
      <p className="text-white/90 leading-relaxed">{description}</p>
    </div>
    
    {/* Subtle overlay for depth */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
    
    {/* Animated background elements */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
    <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-10 -translate-x-10" />
  </div>
);

const WhySpeedLeadsSection = () => {
  const features = [
    {
      title: "הרחבת דפדפן חכמה",
      description: "פשוט כמו צילום מסך - תפעילו את ההרחבה ונבדק הכל אוטומטית. הטכנולוגיה שלנו עושה את העבודה הקשה בשבילכם.",
      gradient: "bg-gradient-to-br from-tech-blue to-blue-600",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "צעדים אוטומטיים",
      description: "לא תכתבו שוב תהליכי שחזור ידניים. המערכת שלנו מתעדת אוטומטית כל פעולה ויוצרת תיעוד מקצועי בזמן אמת.",
      gradient: "bg-gradient-to-br from-gold to-yellow-600",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      title: "קסם השחזור המיידי",
      description: "תפסו מה שקרה זה עתה! טכנולוגיית השחזור המתקדמת שלנו מאפשרת לכם לראות בדיוק מה המשתמש עשה, צעד אחר צעד.",
      gradient: "bg-gradient-to-br from-purple-600 to-indigo-700",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10v4a1 1 0 01-1 1H7a1 1 0 01-1-1v-4a1 1 0 011-1h1a1 1 0 011 1z" />
        </svg>
      )
    },
    {
      title: "סמנו ושתפו",
      description: "הוסיפו הערות, טשטשו מידע רגיש, ערכו את התמונות ושתפו עם הצוות בקליק אחד. שיתוף פעולה יעיל ומהיר.",
      gradient: "bg-gradient-to-br from-dark to-gray-800",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
      )
    }
  ];

  return (
    <section id="why-speedleads" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-aos="fade-up">
            למה SpeedLeads.AI?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gold to-tech-blue mx-auto mb-8" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            פתרונות AI מתקדמים שחוסכים זמן, משפרים דיוק ומאפשרים לכם להתמקד במה שחשוב באמת
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              gradient={feature.gradient}
              icon={feature.icon}
            />
          ))}
        </div>
        
        <div className="text-center mt-12" data-aos="fade-up">
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
};

export default WhySpeedLeadsSection;
