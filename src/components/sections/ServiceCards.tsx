import React from "react"
import { MagicCard } from "@/components/ui/magic-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
} from "lucide-react"

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
  trustSignals: string[]
}

const services: Service[] = [
  {
    id: "service_advanced_digital_experiences",
    title: "פיתוח חוויות דיגיטליות מתקדמות",
    subtitle: "פתרונות דיגיטליים מותאמים אישית לעסק שלך",
    description: "אתרי תדמית יוקרתיים, דפי נחיתה ממוקדי המרה ופתרונות מסחר אלקטרוני מתקדמים המותאמים למותג שלך.",
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
    id: "service_integrations",
    title: "אינטגרציות וכלים מתקדמים",
    subtitle: "שדרג את האתר שלך עם טכנולוגיות מתקדמות",
    description: "כלים טכנולוגיים מתקדמים לשיפור חוויית המשתמש עם AI, שירות לקוחות מיידי והתאמה אישית.",
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
]

const ServiceCards = () => {
  return (
    <section 
      id="services" 
      className="py-12 sm:py-20 bg-gradient-to-b from-gray-50 to-white" 
      aria-labelledby="services_title"
    >
      <div className="container mx-auto px-2 xs:px-4 sm:px-6">
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
          
          <div className="w-32 h-1.5 bg-gradient-to-r from-gold via-tech-blue to-gold mx-auto mb-8 rounded-full" data-aos="fade-up" data-aos-delay="200" />
          
          <p
            className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            פתרונות מקצה לקצה — פיתוח, אוטומציה ואינטגרציות — בעיצוב מדויק ובביצועים שממירים.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-7xl mx-auto px-2 xs:px-4 sm:px-6">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <MagicCard
                key={service.id}
                className="h-full min-h-[600px] xs:min-h-[650px] sm:min-h-[700px] md:min-h-[750px] lg:min-h-[800px] group relative overflow-hidden"
                gradientColor="hsl(188, 100%, 50%)"
                gradientOpacity={0.15}
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                <article className="p-4 xs:p-5 sm:p-6 md:p-8 h-full flex flex-col justify-between text-right relative z-10">

                  {/* Mobile Accent bar */}
                  <div className="sm:hidden h-1.5 xs:h-2 bg-gradient-to-r from-gold via-tech-blue to-gold mb-3 xs:mb-4 sm:mb-6 rounded-full" />

                  {/* Mobile Icon - Top Left Corner */}
                  <div className="absolute top-10 xs:top-12 left-3 xs:left-4 sm:hidden z-20">
                    <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-br from-gold/20 to-tech-blue/20 rounded-lg xs:rounded-xl flex items-center justify-center shadow-lg border border-gold/30">
                      <IconComponent className="w-5 h-5 xs:w-6 xs:h-6 text-gold" />
                    </div>
                  </div>

                  {/* Desktop Icon and Header - Hidden on Mobile */}
                  <div className="hidden sm:block mb-8">
                    {/* Accent top bar */}
                    <div className="h-2 bg-gradient-to-r from-gold via-tech-blue to-gold mb-8 rounded-full" />
                    
                    <div className="w-20 h-20 bg-gradient-to-br from-gold/20 to-tech-blue/20 rounded-3xl flex items-center justify-center mb-6 mr-auto shadow-lg border border-gold/30 sm:hover:shadow-xl sm:hover:scale-105 transition-all duration-300">
                      <IconComponent className="w-10 h-10 text-gold group-hover:text-tech-blue transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Mobile Header Section */}
                  <div className="sm:hidden flex-none pl-12 xs:pl-16 text-right">
                    <h3 className="text-lg xs:text-xl font-bold text-dark mb-2 xs:mb-3 group-hover:text-tech-blue transition-colors duration-300 leading-tight text-right">
                      {service.title}
                    </h3>
                    <p className="text-sm xs:text-base font-medium text-gray-500 mb-3 xs:mb-4 leading-relaxed text-right">
                      {service.subtitle}
                    </p>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4 xs:mb-5 text-right">
                      {service.description}
                    </p>
                  </div>

                  {/* Desktop Header */}
                  <div className="hidden sm:block mb-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-dark mb-3 group-hover:text-tech-blue transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-lg font-medium text-gray-500 mb-4">
                      {service.subtitle}
                    </p>
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Mobile - Key Benefits Section */}
                  <div className="sm:hidden flex-1 mb-4 xs:mb-5">
                    <h4 className="text-sm xs:text-base font-bold text-dark mb-3 xs:mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 xs:w-5 xs:h-5 text-green-500" />
                      מה כלול בשירות:
                    </h4>
                    <ul className="space-y-2 xs:space-y-3 text-sm xs:text-base text-gray-700 mb-4 xs:mb-5">
                      {service.points.slice(0, 3).map((point, pointIndex) => (
                        <li key={pointIndex} className="flex items-start">
                          <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-tech-blue rounded-full mt-1.5 ml-2 xs:ml-3 flex-shrink-0" />
                          <span className="font-medium leading-relaxed text-right">{point}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <h4 className="text-sm xs:text-base font-bold text-dark mb-3 xs:mb-4 flex items-center gap-2">
                      <Zap className="w-4 h-4 xs:w-5 xs:h-5 text-yellow-500" />
                      תכונות מתקדמות:
                    </h4>
                    <ul className="space-y-2 xs:space-y-3 text-sm xs:text-base text-gray-600">
                      {service.features.slice(0, 3).map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-gold rounded-full mt-1.5 ml-2 xs:ml-3 flex-shrink-0" />
                          <span className="leading-relaxed text-right">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Desktop - Separate Sections */}
                  <div className="hidden sm:block">
                    {/* Key Points */}
                    <div className="mb-8">
                      <h4 className="text-lg font-bold text-dark mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        מה כלול בשירות:
                      </h4>
                      <ul className="space-y-3 text-sm md:text-base text-gray-700">
                        {service.points.map((point, pointIndex) => (
                          <li key={pointIndex} className="flex items-start group/item">
                            <div className="w-2 h-2 bg-tech-blue rounded-full mt-1.5 mr-3 flex-shrink-0 sm:group-hover/item:scale-150 transition-transform duration-300" />
                            <span className="font-medium sm:group-hover/item:text-tech-blue transition-colors duration-300">
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
                      <ul className="space-y-2 text-sm text-gray-600">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>


                  {/* Mobile - Bottom Section with Pricing & CTA */}
                  <div className="sm:hidden flex-none">
                    {/* Compact Pricing */}
                    <div className="mb-3 xs:mb-4 p-3 xs:p-4 bg-gradient-to-l from-gray-50 to-white rounded-lg border border-gray-100">
                      <div className="flex items-center justify-between text-sm xs:text-base">
                        <span className="font-bold text-tech-blue">{service.price}</span>
                        <span className="text-gray-600">{service.deliveryTime}</span>
                      </div>
                    </div>

                    {/* Trust Signals */}
                    <div className="mb-3 xs:mb-4">
                      <div className="flex gap-1 xs:gap-2 flex-wrap">
                        {service.trustSignals.map((signal, signalIndex) => (
                          <span 
                            key={signalIndex}
                            className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs xs:text-sm font-medium px-2 xs:px-3 py-1 xs:py-1.5 rounded-md border border-green-200"
                          >
                            <CheckCircle2 className="w-3 h-3 xs:w-4 xs:h-4" />
                            {signal}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Mobile CTA Button */}
                    <Button 
                      id={`${service.id}_cta`}
                      className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 xs:py-4 px-4 xs:px-6 rounded-lg transition-all duration-300 text-sm xs:text-base"
                      size="lg"
                    >
                      {service.button}
                      <Rocket className="w-4 h-4 xs:w-5 xs:h-5 mr-2 xs:mr-3" />
                    </Button>
                  </div>

                  {/* Desktop - Full Pricing and Trust Signals */}
                  <div className="hidden sm:block">
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
                  </div>
                  
                  {/* Desktop CTA Button */}
                  <div className="hidden sm:block mt-auto">
                    <Button 
                      id={`${service.id}_cta_desktop`}
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
        <div className="text-center mt-16" data-aos="fade-up" data-aos-delay="300" data-aos-duration="600">
          <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 max-w-4xl mx-auto shadow-xl sm:hover:shadow-2xl transition-all duration-300 sm:hover:scale-105">
            <h3 className="text-2xl md:text-3xl font-bold text-dark mb-4">
              מוכנים לשדרג את העסק שלכם?
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              בואו נתחיל בפגישת ייעוץ חינם ונראה איך אנחנו יכולים לעזור לכם להגיע למטרות שלכם
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-tech-blue to-blue-600 hover:from-blue-600 hover:to-tech-blue text-white font-bold px-8 py-4 rounded-xl shadow-lg sm:hover:shadow-xl transition-all duration-300 sm:hover:scale-105 animate-fade-in"
                data-aos="fade-up" 
                data-aos-delay="600"
                data-aos-duration="400"
              >
                <Users className="w-5 h-5 ml-2" />
                קבעו פגישת ייעוץ חינם
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-gold text-gold hover:bg-gold hover:text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 sm:hover:scale-105 animate-fade-in"
                data-aos="fade-up" 
                data-aos-delay="700"
                data-aos-duration="400"
              >
                <Star className="w-5 h-5 ml-2" />
                צפו בדוגמאות עבודות
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServiceCards