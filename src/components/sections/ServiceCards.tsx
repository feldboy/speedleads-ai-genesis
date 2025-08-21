import React from "react";
import { MagicCard } from "@/components/ui/magic-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Palette, 
  Bot, 
  BrainCircuit, 
  Star, 
  CheckCircle2, 
  Users, 
  Trophy, 
  Zap,
  Shield,
  Rocket,
  Award
} from "lucide-react";

interface Service {
  id: string
  title: string
  subtitle: string
  description: string
  points: string[]
  features: string[]
  button: string
  icon: React.ComponentType<{ className?: string }>
  price: string
  deliveryTime: string
  trustSignals: string[];
}

const services: Service[] = [
  {
    id: "service_advanced_digital_experiences",
    title: "פיתוח חוויות דיגיטליות מתקדמות",
    subtitle: "פתרונות דיגיטליים מותאמים אישית לעסק שלך",
    description: "בניית אתרי תדמית יוקרתיים, דפי נחיתה ממוקדי המרה ופתרונות מסחר אלקטרוני מתקדמים. התאמה מלאה למותג שלך, עם תשתית מוכנה לצמיחה והובלה טכנולוגית.",
    points: [
      "אתרי תדמית יוקרתיים עם עיצוב מותאם אישית",
      "דפי נחיתה ממירים עם אופטימיזציה לקונברסיה",
      "פתרונות מסחר אלקטרוני מתקדמים עם CRM משולב",
      "מערכות ניהול תוכן מקצועיות וידידותיות"
    ],
    features: [
      "עיצוב רספונסיבי למכשירים ניידים",
      "אופטימיזציה למנועי חיפוש (SEO)",
      "טעינה מהירה ואבטחה מתקדמת",
      "ניתוח נתונים ודוחות ביצועים"
    ],
    button: "בואו נתחיל בפרויקט",
    icon: Palette,
    price: "החל מ-15,000 ₪",
    deliveryTime: "4-8 שבועות",
    trustSignals: ["אחריות מלאה", "תמיכה 24/7", "עדכונים חינם"]
  },
  {
    id: "service_automations",
    title: "אוטומציות ושיפור תהליכים",
    subtitle: "חסוך זמן וכסף עם אוטומציות חכמות",
    description: "הפיכת תהליכים ידניים לאוטומטיים עם פתרונות טכנולוגיים שמייעלים את התפעול, חוסכים זמן ומגדילים רווחיות. ניתן לשלב מערכות קיימות או לפתח פתרון ייעודי מאפס.",
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
    deliveryTime: "2-4 שבועות",
    trustSignals: ["ROI מובטח", "הדרכה מלאה", "תמיכה מתמשכת"]
  },
  {
    id: "service_integrations",
    title: "אינטגרציות וכלים מתקדמים",
    subtitle: "שדרג את האתר שלך עם טכנולוגיות מתקדמות",
    description: "שילוב כלים טכנולוגיים מתקדמים באתר שלך לשיפור חוויית המשתמש - משירות לקוחות מיידי ועד התאמה אישית של תוכן ועיצוב. הגבר מעורבות ושמור על יתרון תחרותי.",
    points: [
      "כלי שירות לקוחות מתקדמים עם בינה מלאכותית",
      "חיפוש חכם והמלצות מותאמות אישית",
      "עיצוב ותוכן אינטראקטיבי ומרשים",
      "מערכות CRM ואנליטיקה מתקדמות"
    ],
    features: [
      "צ'אט בוט חכם עם עיבוד שפה טבעית",
      "מערכת המלצות מבוססת AI",
      "פרסונליזציה דינמית של תוכן",
      "אינטגרציה עם רשתות חברתיות"
    ],
    button: "שדרג את האתר שלך",
    icon: BrainCircuit,
    price: "החל מ-12,000 ₪",
    deliveryTime: "3-6 שבועות",
    trustSignals: ["תוצאות מוכחות", "יועץ אישי", "גישה מלאה לנתונים"]
  },
];

const ServiceCards = () => {
  return (
    <section 
      id="services" 
      className="py-20 bg-gradient-to-b from-gray-50 to-white" 
      aria-labelledby="services_title"
    >
      <div className="container mx-auto">
        <header className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-6 py-2 mb-6" data-aos="fade-up">
            <Shield className="w-4 h-4 text-tech-blue" />
            <span className="text-sm font-medium text-gray-600">פתרונות מקצועיים מובילים</span>
          </div>
          
          <h2
            id="services_title"
            className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-l from-tech-blue via-gold to-tech-blue bg-clip-text text-transparent"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            השירותים שלנו
          </h2>
          
          <div className="w-32 h-1.5 bg-gradient-to-r from-gold via-tech-blue to-gold mx-auto mb-8 rounded-full" data-aos="fade-up" data-aos-delay="200" />
          
          <p
            className="text-base sm:text-lg md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4 sm:px-0"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            פתרונות מקצה לקצה — פיתוח, אוטומציה ואינטגרציות — בעיצוב מדויק ובביצועים שממירים.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto px-4 lg:px-0">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <MagicCard
                key={service.id}
                className="h-full group relative overflow-hidden"
                gradientColor="hsl(188, 100%, 50%)"
                gradientOpacity={0.15}
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                <article className="p-6 sm:p-8 h-full flex flex-col text-right relative z-10"

                  {/* Accent top bar */}
                  <div className="h-2 bg-gradient-to-r from-speedleads-gold via-accent to-speedleads-gold mb-8 rounded-full" />
                  
                  {/* Icon and Header */}
                  <div className="mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-speedleads-gold/20 to-accent/20 rounded-3xl flex items-center justify-center mb-6 mr-auto shadow-lg border border-speedleads-gold/30 hover:shadow-xl hover:scale-105 transition-all duration-300">
                      <IconComponent className="w-10 h-10 text-speedleads-gold group-hover:text-accent transition-colors duration-300" />
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-dark mb-3 group-hover:text-tech-blue transition-colors duration-300"
                      {service.title}
                    </h3>
                    
                    <p className="text-base sm:text-lg font-medium text-gray-500 mb-4"
                      {service.subtitle}
                    </p>
                    
                    <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed"
                      {service.description}
                    </p>
                  </div>

                  {/* Key Points */}
                  <div className="mb-8">
                    <h4 className="text-lg font-bold text-dark mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      מה כלול בשירות:
                    </h4>
                    <ul className="space-y-3 text-xs sm:text-sm md:text-base text-gray-700"
                      {service.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex items-start group/item">
                          <div className="w-2 h-2 bg-tech-blue rounded-full mt-2 mr-3 flex-shrink-0 group-hover/item:scale-150 transition-transform duration-300" />
                          <span className="font-medium group-hover/item:text-tech-blue transition-colors duration-300">
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Advanced Features */}
                  <div className="mb-8">
                    <h4 className="text-lg font-bold text-dark mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-500" />
                      תכונות מתקדמות:
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-gray-600"
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>


                  {/* Pricing and Timing */}
                  <div className="mb-8 p-4 bg-gradient-to-l from-gray-50 to-white rounded-xl border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">מחיר:</span>
                      <span className="text-lg font-bold text-tech-blue">{service.price}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">זמן ביצוע:</span>
                      <span className="text-sm font-semibold text-gray-700">{service.deliveryTime}</span>
                    </div>
                  </div>

                  {/* Trust Signals */}
                  <div className="mb-8">
                    <h4 className="text-sm font-bold text-gray-500 mb-3 flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      מה מבטיחים לך:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {service.trustSignals.map((signal, signalIndex) => (
                        <span 
                          key={signalIndex}
                          className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-medium px-2 py-1 rounded-full border border-green-200"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          {signal}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <div className="mt-auto">
                    <Button 
                      id={`${service.id}_cta`}
                      className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 text-lg"
                      size="lg"
                    >
                      {service.button}
                      <Rocket className="w-5 h-5 mr-2" />
                    </Button>
                  </div>
                </article>

                {/* Background decoration */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gray-200 opacity-20" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gray-100 opacity-5 rounded-tl-full" />
              </MagicCard>
            )
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-16" data-aos="zoom-in" data-aos-delay="300" data-aos-duration="800" data-aos-easing="ease-out-cubic">
          <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 max-w-4xl mx-auto shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-dark mb-4"
              מוכנים לשדרג את העסק שלכם?
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-6"
              בואו נתחיל בפגישת ייעוץ חינם ונראה איך אנחנו יכולים לעזור לכם להגיע למטרות שלכם
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 sm:px-0"
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-tech-blue to-blue-600 hover:from-blue-600 hover:to-tech-blue text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in text-sm sm:text-base min-h-[44px]"
                data-aos="slide-right" 
                data-aos-delay="600"
                data-aos-duration="600"
              >
                <Users className="w-5 h-5 ml-2" />
                קבעו פגישת ייעוץ חינם
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-gold text-gold hover:bg-gold hover:text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300 hover:scale-105 animate-fade-in text-sm sm:text-base min-h-[44px]"
                data-aos="slide-left" 
                data-aos-delay="800"
                data-aos-duration="600"
              >
                <Star className="w-5 h-5 ml-2" />
                צפו בדוגמאות עבודות
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;