import React from "react";
import { Button } from "@/components/ui/button";

interface Service {
  id: string;
  title: string;
  description: string;
  points: string[];
  button: string;
}

const services: Service[] = [
  {
    id: "service_advanced_digital_experiences",
    title: "פיתוח חוויות דיגיטליות מתקדמות",
    description:
      "בניית אתרי תדמית יוקרתיים, דפי נחיתה ממוקדי המרה ופתרונות E-Commerce חכמים. התאמה מלאה למותג שלך, עם תשתית מוכנה לצמיחה והובלה טכנולוגית.",
    points: [
      "אתרי תדמית מותאמים אישית",
      "דפי נחיתה ממירים",
      "פתרונות E-Commerce חכמים",
    ],
    button: "בואו נתחיל בפרויקט",
  },
  {
    id: "service_ai_automations",
    title: "אוטומציות חכמות מבוססות AI",
    description:
      "הפוך תהליכים ידניים לאוטומטיים עם פתרונות AI שמייעלים את התפעול, חוסכים זמן ומגדילים רווחיות. ניתן לשלב מערכות קיימות או לפתח פתרון ייעודי מאפס.",
    points: [
      "אוטומציות מוכנות ליישום",
      "פתרונות מותאמים אישית",
      "חיסכון בזמן ותפעול יעיל",
    ],
    button: "גלה את הפתרונות שלנו",
  },
  {
    id: "service_ai_integrations",
    title: "אינטגרציות AI לשירות מתקדם",
    description:
      "שילוב כלי AI מתקדמים באתר שלך לשיפור חוויית המשתמש – משירות לקוחות מיידי ועד התאמה אישית של תוכן ועיצוב. הגבר מעורבות ושמור על יתרון תחרותי.",
    points: [
      "צ'אטבוטים חכמים לשירות לקוחות",
      "חיפוש חכם והמלצות מותאמות",
      "עיצוב ותוכן אינטראקטיבי חכם",
    ],
    button: "שדרג את האתר שלך",
  },
];

const ServiceCards = () => {
  return (
    <section id="services" className="py-20 bg-white" aria-labelledby="services_title">
      <div className="container mx-auto px-4">
        <header className="text-center mb-14">
          <h2
            id="services_title"
            className="text-3xl md:text-4xl font-bold mb-4"
            data-aos="fade-up"
          >
            השירותים שלנו
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gold to-tech-blue mx-auto mb-6" />
          <p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            פתרונות מקצה לקצה — פיתוח, אוטומציה ואינטגרציות AI — בעיצוב מדויק ובביצועים שממירים.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((svc, idx) => (
            <article
              key={svc.id}
              className="group bg-white rounded-2xl shadow-xl/30 hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 animate-fade-in"
              data-aos="fade-up"
              data-aos-delay={100 * (idx + 1)}
            >
              {/* Accent top bar */}
              <div className="h-1.5 bg-gradient-to-r from-gold via-tech-blue to-gold" />

              {/* Content */}
              <div className="flex flex-col p-7 md:p-8 h-full">
                <h3 className="text-xl md:text-2xl font-bold text-dark mb-3 text-right">
                  {svc.title}
                </h3>
                <p className="text-gray-600 text-base md:text-lg mb-6 leading-relaxed text-right">
                  {svc.description}
                </p>

                <ul className="space-y-3 text-sm md:text-base text-gray-700 mb-8 text-right">
                  {svc.points.map((pt, i) => (
                    <li key={i} className="flex items-center gap-3 justify-end">
                      <span className="w-2 h-2 rounded-full bg-tech-blue shrink-0" aria-hidden="true" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <Button
                    id={`${svc.id}_cta`}
                    className="w-full bg-tech-blue hover:bg-gold hover:text-dark text-white font-semibold py-3 rounded-lg transition-all duration-200"
                    style={{ fontSize: "1.06rem" }}
                  >
                    {svc.button}
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
