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
  id: string;
  title: string;
  subtitle: string;
  description: string;
  points: string[];
  features: string[];
  button: string;
  icon: any;
  price: string;
  deliveryTime: string;
  trustSignals: string[];
}

const services: Service[] = [
  {
    id: "service_advanced_digital_experiences",
    title: "פיתוח אתרים מתקדם",
    subtitle: "פתרונות דיגיטליים מותאמים אישית לעסק שלך",
    description: "אתרי תדמית יוקרתיים ודפי נחיתה ממוקדי המרה המותאמים למותג שלך.",
    points: [
      "עיצוב מותאם אישית למותג שלך",
      "ביצועים מעולים וחוויית משתמש מושלמת",
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
    deliveryTime: "4-8 שבועות",
    trustSignals: ["אחריות מלאה", "תמיכה 24/7", "עדכונים חינם"]
  },
  {
    id: "service_automations",
    title: "אוטומציות ושיפור תהליכים",
    subtitle: "חסוך זמן וכסף עם אוטומציות חכמות",
    description: "פתרונות טכנולוגיים שמייעלים תפעול וחוסכים זמן עם אוטומציות מתקדמות.",
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
    id: "service_ai_implementations",
    title: "הטמעת פתרונות AI",
    subtitle: "הצטרף למהפכת הבינה המלאכותית",
    description: "פיתוח והטמעה של פתרונות בינה מלאכותית מותאמים לעסק שלך עם יתרון תחרותי ברור.",
    points: [
      "פתרונות AI מותאמים לתחום העסקי שלכם",
      "שילוב חלק במערכות קיימות",
      "שיפור משמעותי ברמת השירות והיעילות",
      "מעקב וניתוח תוצאות בזמן אמת"
    ],
    features: [
      "צ'אטבוטים חכמים ומתקדמים",
      "ניתוח נתונים וחיזוי מגמות",
      "אוטומציה חכמה של תהליכים",
      "אינטגרציה עם רשתות חברתיות"
    ],
    button: "שדרג את האתר שלך",
    icon: BrainCircuit,
    price: "החל מ-12,000 ₪",
    deliveryTime: "3-6 שבועות",
    trustSignals: ["תוצאות מוכחות", "יועץ אישי", "גישה מלאה לנתונים"]
  },
];

function ServiceCards() {
  return (
    <section id="services" className="py-20 bg-gradient-to-b from-gray-50 to-white" aria-labelledby="services_title">
      <div className="container mx-auto">
        <header className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-6 py-2 mb-6" data-aos="fade-up">
            <Shield className="w-4 h-4 text-tech-blue" />
            <span className="text-sm font-medium text-gray-600">פתרונות מקצועיים מובילים</span>
          </div>
          
          <h2
            id="services_title"
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-l from-tech-blue via-gold to-tech-blue bg-clip-text text-transparent"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            השירותים שלנו
          </h2>
          
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="200">
            אנחנו מתמחים בפיתוח פתרונות טכנולוגיים מתקדמים שמביאים תוצאות אמיתיות.
            כל פרויקט מותאם אישית לצרכים הייחודיים של העסק שלכם.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <MagicCard
                key={service.id}
                className="group relative overflow-hidden bg-white border border-gray-200 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 min-h-[595px]"
                gradientColor="#f0f9ff"
                gradientOpacity={0.1}
                data-aos="fade-up"
                data-aos-delay={index * 200}
              >
                  {/* Content */}
                  <div className="flex flex-col justify-between min-h-full">
                    {/* Main Content - Flexible height */}
                    <div className="flex-grow space-y-4 lg:space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-tech-blue to-gold rounded-xl flex items-center justify-center shadow-lg">
                          <IconComponent className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                        </div>
                        <h3 className="text-xl lg:text-3xl font-bold text-gray-900 flex-1">
                          {service.title}
                        </h3>
                      </div>
                      
                      <div className="space-y-3 lg:space-y-4">
                        <h4 className="text-base lg:text-lg font-semibold text-tech-blue">
                          {service.subtitle}
                        </h4>
                        
                        <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                          {service.description}
                        </p>

                        {/* Key Points */}
                        <div className="space-y-2">
                          {service.points.slice(0, 3).map((point, pointIndex) => (
                            <div key={pointIndex} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 text-sm leading-relaxed">{point}</span>
                            </div>
                          ))}
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-1 gap-2">
                          {service.features.slice(0, 3).map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
                              <Zap className="w-4 h-4 text-tech-blue flex-shrink-0" />
                              <span className="text-sm font-medium text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* Price & Time */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg lg:text-2xl font-bold text-tech-blue">{service.price}</span>
                            <div className="flex items-center gap-1">
                              <Trophy className="w-3 h-3 lg:w-4 lg:h-4 text-gold" />
                              <span className="text-xs lg:text-sm text-gray-500">מחיר הוגן</span>
                            </div>
                          </div>
                          <Badge variant="secondary" className="bg-tech-blue/10 text-tech-blue font-medium px-2 py-1 text-xs">
                            {service.deliveryTime}
                          </Badge>
                        </div>

                        {/* Trust Signals */}
                        <div className="flex flex-wrap gap-1 lg:gap-2">
                          {service.trustSignals.slice(0, 2).map((signal, signalIndex) => (
                            <Badge key={signalIndex} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200 px-2 py-1">
                              <Award className="w-2 h-2 lg:w-3 lg:h-3 ml-1" />
                              {signal}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* CTA Button - Fixed at bottom */}
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <Button 
                        size="lg" 
                        className="w-full bg-gradient-to-r from-tech-blue to-tech-blue-dark hover:from-tech-blue-dark hover:to-tech-blue text-white font-bold px-6 lg:px-8 py-3 lg:py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-sm lg:text-base"
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                      >
                        <Rocket className="w-4 h-4 lg:w-5 lg:h-5 ml-2" />
                        {service.button}
                      </Button>
                    </div>
                  </div>
              </MagicCard>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-tech-blue via-tech-blue-dark to-tech-blue hover:from-tech-blue-dark hover:via-tech-blue hover:to-tech-blue-dark text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl animate-fade-in text-sm sm:text-base min-h-[44px]"
              style={{ transformOrigin: 'center', transition: 'all 0.3s ease', transform: 'scale(1)' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              data-aos="slide-right" 
              data-aos-delay="600"
              data-aos-duration="600"
            >
              <Rocket className="w-5 h-5 ml-2" />
              בואו נתחיל לעבוד יחד
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-gold text-gold hover:bg-gold hover:text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl animate-fade-in text-sm sm:text-base min-h-[44px]"
              style={{ transformOrigin: 'center', transition: 'all 0.3s ease', transform: 'scale(1)' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              onClick={() => document.getElementById('success-stories')?.scrollIntoView({ behavior: 'smooth' })}
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
    </section>
  );
}

export default ServiceCards;