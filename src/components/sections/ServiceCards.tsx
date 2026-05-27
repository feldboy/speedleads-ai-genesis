import React from "react";
import { Button } from "@/components/ui/button";
import MagneticButton from "@/components/effects/MagneticButton";
import { Palette, Bot, BrainCircuit, ArrowUpLeft } from "lucide-react";

interface Service {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  points: string[];
  features: string[];
  button: string;
  icon: any;
  price: string;
  deliveryTime: string;
}

const services: Service[] = [
  {
    id: "service_advanced_digital_experiences",
    number: "01",
    title: "פיתוח אתרים מתקדם",
    subtitle: "Experiences",
    description: "אתרי תדמית יוקרתיים, דפי נחיתה ממוקדי המרה ופתרונות E-Commerce חכמים — מותאמים אישית למותג שלך.",
    points: [
      "עיצוב מותאם אישית למותג שלך",
      "ביצועים מעולים וחווית משתמש מושלמת",
      "SEO מתקדם ואופטימיזציה מלאה",
      "תמיכה מתמשכת ועדכונים קבועים"
    ],
    features: [
      "אתרי תדמית יוקרתיים",
      "דפי נחיתה ממוקדי המרה",
      "פתרונות מסחר אלקטרוני",
      "מערכות ניהול תוכן מתקדמות"
    ],
    button: "בואו נתחיל בפרויקט",
    icon: Palette,
    price: "החל מ-15,000 ₪",
    deliveryTime: "4-8 שבועות"
  },
  {
    id: "service_automations",
    number: "02",
    title: "אוטומציות ושיפור תהליכים",
    subtitle: "Automation",
    description: "פתרונות טכנולוגיים שמייעלים תפעול וחוסכים זמן עם אוטומציות מתקדמות, מוכנות ליישום מיידי.",
    points: [
      "אוטומציות מוכנות ליישום מיידי",
      "פתרונות מותאמים אישית לעסק שלך",
      "חיסכון משמעותי בזמן ותפעול יעיל",
      "אינטגרציה חלקה עם מערכות קיימות"
    ],
    features: [
      "בוטים חכמים לשירות לקוחות",
      "אוטומציית משימות שחוזרות על עצמן",
      "מערכות דיווח ומעקב אוטומטיות",
      "התראות ועדכונים בזמן אמת"
    ],
    button: "גלה את הפתרונות שלנו",
    icon: Bot,
    price: "החל מ-8,000 ₪",
    deliveryTime: "2-4 שבועות"
  },
  {
    id: "service_ai_implementations",
    number: "03",
    title: "אינטגרציות AI לשירות מתקדם",
    subtitle: "Intelligence",
    description: "שילוב כלי AI מתקדמים בעסק שלך — משירות לקוחות מיידי ועד התאמה אישית של תוכן ועיצוב.",
    points: [
      "פתרונות AI מותאמים לתחום העסקי",
      "שילוב חלק במערכות קיימות",
      "שיפור משמעותי ברמת השירות והיעילות",
      "מעקב וניתוח תוצאות בזמן אמת"
    ],
    features: [
      "צ'אטבוטים חכמים ומתקדמים",
      "ניתוח נתונים וחיזוי מגמות",
      "חיפוש חכם והמלצות מותאמות",
      "עיצוב ותוכן אינטראקטיבי חכם"
    ],
    button: "שדרג את האתר שלך",
    icon: BrainCircuit,
    price: "החל מ-12,000 ₪",
    deliveryTime: "3-6 שבועות"
  },
];

function ServiceCards() {
  return (
    <section id="services" className="py-24 lg:py-32 bg-white" aria-labelledby="services_title">
      <div className="container mx-auto">
        {/* Header — asymmetric */}
        <div className="asym-grid items-end mb-20">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="section-index text-tech-blue">02 / 04</span>
              <span className="h-px w-12 bg-tech-blue/40" />
              <span className="eyebrow text-gray-500">What we do</span>
            </div>
            <h2
              id="services_title"
              className="heading-he display-lg text-dark"
              data-aos="fade-up"
            >
              השירותים <br />
              <span className="gradient-text">שלנו.</span>
            </h2>
          </div>
          <p className="text-base lg:text-lg text-gray-600 leading-relaxed max-w-md lg:justify-self-end" data-aos="fade-up" data-aos-delay="100">
            אנחנו מתמחים בפיתוח פתרונות טכנולוגיים מתקדמים שמביאים תוצאות אמיתיות. כל פרויקט מותאם אישית לצרכים הייחודיים של העסק שלכם.
          </p>
        </div>

        {/* Service rows — alternating asymmetric */}
        <div className="border-t border-gray-200">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const isEven = index % 2 === 0;
            return (
              <article
                key={service.id}
                className="group grid grid-cols-12 gap-6 lg:gap-10 py-12 lg:py-16 border-b border-gray-200 hover:bg-gray-50/60 transition-colors duration-500"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {/* Number + icon */}
                <div className={`col-span-12 lg:col-span-2 ${isEven ? '' : 'lg:order-3'}`}>
                  <div className="font-display text-tech-blue mb-3" style={{ fontSize: '0.75rem', letterSpacing: '0.18em' }}>
                    {service.number}
                  </div>
                  <div className="w-14 h-14 border border-gray-300 flex items-center justify-center group-hover:border-tech-blue group-hover:bg-tech-blue/5 transition-all" style={{ borderRadius: '2px' }}>
                    <IconComponent className="w-6 h-6 text-dark group-hover:text-tech-blue transition-colors" />
                  </div>
                </div>

                {/* Title + description */}
                <div className="col-span-12 lg:col-span-6">
                  <div className="eyebrow text-gray-400 mb-3">{service.subtitle}</div>
                  <h3 className="heading-he text-dark mb-5" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', lineHeight: 1.05 }}>
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6 max-w-xl">
                    {service.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 max-w-xl">
                    {service.features.map((feature, fi) => (
                      <div key={fi} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-tech-blue mt-1 shrink-0">—</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Meta + CTA */}
                <div className="col-span-12 lg:col-span-4 flex flex-col justify-between gap-6 lg:items-end">
                  <div className={`flex flex-col gap-4 ${isEven ? 'lg:items-end lg:text-right' : 'lg:items-end lg:text-right'}`}>
                    <div>
                      <div className="eyebrow text-gray-400 mb-1">Investment</div>
                      <div className="font-display text-dark" style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                        {service.price}
                      </div>
                    </div>
                    <div>
                      <div className="eyebrow text-gray-400 mb-1">Timeline</div>
                      <div className="font-display text-dark" style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                        {service.deliveryTime}
                      </div>
                    </div>
                  </div>
                  <MagneticButton onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                    <Button
                      className="btn-brand text-white px-6 py-3 text-xs uppercase tracking-wider min-h-[44px] inline-flex items-center gap-3"
                    >
                      {service.button}
                      <ArrowUpLeft className="w-4 h-4" />
                    </Button>
                  </MagneticButton>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ServiceCards;
