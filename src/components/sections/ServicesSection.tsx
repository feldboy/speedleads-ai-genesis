
import React from 'react';
import { Button } from '@/components/ui/button';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  id: string;
}

const ServiceCard = ({ title, description, icon, id }: ServiceCardProps) => (
  <div className="service-card">
    <div className="text-tech-blue mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-4 text-dark">{title}</h3>
    <p className="text-gray-600 mb-6 flex-grow">{description}</p>
    <Button 
      id={id}
      variant="outline" 
      className="border-tech-blue text-tech-blue hover:bg-tech-blue hover:text-white self-start mt-auto"
    >
      למידע נוסף
    </Button>
  </div>
);

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">השירותים שלנו</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gold to-tech-blue mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            אנחנו מספקים מגוון פתרונות דיגיטליים מתקדמים המותאמים לצרכים הייחודיים של העסק שלכם
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard 
            title="אתרים שחושבים קדימה"
            description="עיצוב ובניית אתרי תדמית ומסחר מרהיבים, מותאמים אישית, עם ביצועים שממירים ומבוססים על מנועי בינה מלאכותית מתקדמים."
            id="service_learn_more_websitebuilding"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
          />

          <ServiceCard 
            title="דפי נחיתה שהופכים קליקים ללקוחות"
            description="יצירת דפי נחיתה ממוקדים ואפקטיביים, מבוססי דאטה ו-AI, לקמפיינים שמביאים תוצאות מדידות ולידים איכותיים."
            id="service_learn_more_landingpages"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
            }
          />

          <ServiceCard 
            title="מסחר אלקטרוני מהדור הבא"
            description="הקמת חנויות אונליין מתקדמות עם חווית משתמש אישית, אוטומציות, ואינטגרציות AI למקסום מכירות וניהול מלאי חכם."
            id="service_learn_more_ecommerce"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            }
          />

          <ServiceCard 
            title="חברו את העסק שלכם לעוצמה של AI"
            description="שילוב כלי AI מתקדמים (צ'אטבוטים, ניתוח נתונים, פרסונליזציה) במערכות הקיימות שלכם לשיפור חווית המשתמש וייעול תהליכים."
            id="service_learn_more_aiintegrations"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            }
          />

          <ServiceCard 
            title="ייעול תהליכים, חיסכון בזמן"
            description="פיתוח והטמעת אוטומציות חכמות לתהליכים עסקיים, שיווקיים ותפעוליים – מותאמות בדיוק לצרכים הייחודיים של העסק שלכם."
            id="service_learn_more_automations"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
          />

          <ServiceCard 
            title="תמיכה ותחזוקה ארוכת טווח"
            description="אנחנו לא נעלמים אחרי השקת הפרויקט. הצוות שלנו ממשיך ללוות אתכם עם תמיכה, שדרוגים ושיפורים מתמשכים לפתרון שלכם."
            id="service_learn_more_support"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
