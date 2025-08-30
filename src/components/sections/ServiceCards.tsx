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
    title: "פיתוח חוויות דיגיטליות מתקדמות",
    subtitle: "פתרונות דיגיטליים מותאמים אישית לעסק שלך",
    description: "אתרי תדמית יוקרתיים, דפי נחיתה ממוקדי המרה ופתרונות מסחר אלקטרוני מתקדמים המותאמים למותג שלך.",
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
    description: "פתרונות טכנולוגיים שמייעלים תפעול, חוסכים זמן ומגדילים רווחיות עם אוטומציות מתקדמות.",
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
    title: "הטמעת פתרונות AI מתקדמים",
    subtitle: "הצטרף למהפכת הבינה המלאכותית",
    description: "פיתוח והטמעה של פתרונות בינה מלאכותית מותאמים לעסק שלך. מעיבוד שפה טבעית ועד ניתוח נתונים מתקדם ומערכות החלטה חכמות שיעזרו לכם לקחת יתרון תחרותי.",
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

        <div className="grid gap-8 md:gap-12 lg:gap-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <MagicCard
                key={service.id}
                className="group relative overflow-hidden bg-white border border-gray-200 rounded-3xl p-8 lg:p-12 shadow-lg hover:shadow-2xl transition-all duration-500"
                gradientColor="#f0f9ff"
                gradientOpacity={0.1}
                data-aos="fade-up"
                data-aos-delay={index * 200}
              >
                <div className={`grid gap-8 lg:gap-12 ${index % 2 === 0 ? 'lg:grid-cols-2' : 'lg:grid-cols-2'}`}>
                  
                  {/* Content Side */}
                  <div className={`${index % 2 !== 0 ? 'lg:order-2' : ''} flex flex-col justify-center`}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-tech-blue to-gold rounded-2xl flex items-center justify-center shadow-lg">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <Badge variant="secondary" className="bg-tech-blue/10 text-tech-blue hover:bg-tech-blue/20 font-medium px-3 py-1">
                        {service.deliveryTime}
                      </Badge>
                    </div>
                    
                    <h3 className="text-2xl lg:text-3xl font-bold mb-3 text-gray-900">
                      {service.title}
                    </h3>
                    
                    <h4 className="text-lg font-semibold text-tech-blue mb-4">
                      {service.subtitle}
                    </h4>
                    
                    <p className="text-gray-600 mb-8 leading-relaxed text-base">
                      {service.description}
                    </p>

                    {/* Key Points */}
                    <div className="space-y-3 mb-8">
                      {service.points.map((point, pointIndex) => (
                        <div key={pointIndex} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm leading-relaxed">{point}</span>
                        </div>
                      ))}
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2 bg-gray-50 rounded-lg p-3">
                          <Zap className="w-4 h-4 text-tech-blue flex-shrink-0" />
                          <span className="text-sm font-medium text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-2xl font-bold text-tech-blue">{service.price}</span>
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-gold" />
                        <span className="text-sm text-gray-500">מחיר הוגן ושקוף</span>
                      </div>
                    </div>

                    {/* Trust Signals */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {service.trustSignals.map((signal, signalIndex) => (
                        <Badge key={signalIndex} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                          <Award className="w-3 h-3 ml-1" />
                          {signal}
                        </Badge>
                      ))}
                    </div>

                    <Button 
                      size="lg" 
                      className="w-full sm:w-auto bg-gradient-to-r from-tech-blue to-tech-blue-dark hover:from-tech-blue-dark hover:to-tech-blue text-white font-bold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      <Rocket className="w-5 h-5 ml-2" />
                      {service.button}
                    </Button>
                  </div>

                  {/* Visual Side */}
                  <div className={`${index % 2 !== 0 ? 'lg:order-1' : ''} relative`}>
                    <div className="relative aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-tech-blue/10 via-gold/10 to-purple-100 flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-tech-blue/5 to-gold/5"></div>
                      <IconComponent className="w-24 h-24 lg:w-32 lg:h-32 text-tech-blue/30" />
                      
                      {/* Floating elements */}
                      <div className="absolute top-4 right-4 w-8 h-8 bg-tech-blue/20 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-tech-blue" />
                      </div>
                      <div className="absolute bottom-4 left-4 w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center">
                        <Star className="w-3 h-3 text-gold" />
                      </div>
                    </div>
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
              className="bg-gradient-to-r from-tech-blue via-tech-blue-dark to-tech-blue hover:from-tech-blue-dark hover:via-tech-blue hover:to-tech-blue-dark text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl animate-fade-in text-sm sm:text-base min-h-[44px]"
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
    </section>
  );
}

export default ServiceCards;