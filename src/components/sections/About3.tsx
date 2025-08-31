import { Button } from "@/components/ui/button";
import MagneticButton from "@/components/effects/MagneticButton";

interface About3Props {
  title?: string;
  description?: string;
  mainImage?: {
    src: string;
    alt: string;
  };
  secondaryImage?: {
    src: string;
    alt: string;
  };
}



export const About3 = ({
  title = "למה SpeedLeads.AI?",
  description = "פתרונות AI מתקדמים שחוסכים זמן, משפרים דיוק ומאפשרים לכם להתמקד במה שחשוב באמת",
  mainImage = {
    src: "/tech-logos-grid.jpg",
    alt: "מגוון כלים וטכנולוגיות מתקדמות לפיתוח דיגיטלי",
  },
  secondaryImage = {
    src: "/lovable-uploads/Group_12762czc.jpg",
    alt: "עבודת צוות מקצועית וטכנולוגית",
  },
}: About3Props = {}) => {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header - Improved text alignment and spacing */}
        <div className="mb-16 text-center max-w-4xl mx-auto" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-l from-[#00f6ff] to-[#00a7ff] bg-clip-text text-transparent leading-tight">
            {title}
          </h1>
          <div className="w-32 h-2 bg-gradient-to-l from-[#00f6ff] to-[#00a7ff] mx-auto mb-8 rounded-full shadow-lg shadow-tech-blue/30" />
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        {/* Images Grid - Enhanced with better proportions */}
        <div className="grid gap-6 lg:gap-8 lg:grid-cols-3 mb-20">
          <div className="lg:col-span-2 group" data-aos="fade-up">
            <img
              src={mainImage.src}
              alt={mainImage.alt}
              className="h-80 md:h-96 lg:h-[500px] w-full rounded-2xl object-cover shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
          <div className="group" data-aos="fade-up" data-aos-delay="100">
            <img
              src={secondaryImage.src}
              alt={secondaryImage.alt}
              className="h-80 md:h-96 lg:h-[500px] w-full rounded-2xl object-cover shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        </div>


        {/* Features Section - Improved card design and spacing */}
        <div className="mb-20">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">מה מייחד אותנו</h2>
            <p className="text-muted-foreground text-lg">ארבעה עמודי התווך שלנו להצלחה שלכם</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
            {/* Feature 1 - שירות אישי */}
            <div className="group rounded-2xl border border-border bg-background/80 backdrop-blur-sm p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2" data-aos="fade-up" data-aos-delay="100">
              <div className="mb-6 overflow-hidden rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=300&fit=crop&auto=format&q=80"
                  alt="שירות אישי ושותפות עסקית אמיתית"
                  className="h-48 w-full object-cover transition-transform duration-300 sm:group-hover:scale-105"
                />
              </div>
              <div className="text-center">
                <h3 className="mb-2 text-2xl font-bold">שירות אישי</h3>
                <h4 className="mb-4 text-lg font-semibold text-blue-600 dark:text-blue-400">
                  שותפות אמיתית והתחייבות
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  אתם מקבלים מנהל פרויקט ייעודי, זמינות גבוהה ותמיכה הרבה אחרי ההשקה. אנחנו השותפים שלכם בכל שלב - מאסטרטגיה ראשונית ועד תחזוקה שוטפת.
                </p>
              </div>
            </div>

            {/* Feature 2 - ניהול מוצר אסטרטגי */}
            <div className="group rounded-2xl border border-border bg-background/80 backdrop-blur-sm p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2" data-aos="fade-up" data-aos-delay="150">
              <div className="mb-6 overflow-hidden rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=300&fit=crop&auto=format&q=80"
                  alt="אנליטיקה ואסטרטגיה מבוססת נתונים"
                  className="h-48 w-full object-cover transition-transform duration-300 sm:group-hover:scale-105"
                />
              </div>
              <div className="text-center">
                <h3 className="mb-2 text-2xl font-bold">ניהול מוצר אסטרטגי</h3>
                <h4 className="mb-4 text-lg font-semibold text-purple-600 dark:text-purple-400">
                  אסטרטגיה ברורה, תוצאות מדידות
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  אנחנו מגדירים את המוצר שלכם יחד, בונים MVP מהיר ומניעים צמיחה דרך איטרציות מבוססות נתונים. עם מדדי הצלחה ברורים, תמיד תדעו מה הסטטוס וה-ROI של הפרויקט.
                </p>
              </div>
            </div>

            {/* Feature 3 - איכות וביצועים */}
            <div className="group rounded-2xl border border-border bg-background/80 backdrop-blur-sm p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2" data-aos="fade-up" data-aos-delay="200">
              <div className="mb-6 overflow-hidden rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=300&fit=crop&auto=format&q=80"
                  alt="תשתית יציבה ובטוחה לביצועים מיטביים"
                  className="h-48 w-full object-cover transition-transform duration-300 sm:group-hover:scale-105"
                />
              </div>
              <div className="text-center">
                <h3 className="mb-2 text-2xl font-bold">איכות וביצועים</h3>
                <h4 className="mb-4 text-lg font-semibold text-green-600 dark:text-green-400">
                  יציב, מאובטח ומהיר
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  אנחנו בונים לפי הסטנדרטים הגבוהים ביותר עם בדיקות אוטומטיות, פרוטוקולי אבטחה מקיפים וזמני טעינה מהירים מותאמים להצלחה ב-SEO.
                </p>
              </div>
            </div>

            {/* Feature 4 - שקיפות מלאה */}
            <div className="group rounded-2xl border border-border bg-background/80 backdrop-blur-sm p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2" data-aos="fade-up" data-aos-delay="250">
              <div className="mb-6 overflow-hidden rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=300&fit=crop&auto=format&q=80"
                  alt="שקיפות מלאה ובקרה על הפרויקט"
                  className="h-48 w-full object-cover transition-transform duration-300 sm:group-hover:scale-105"
                />
              </div>
              <div className="text-center">
                <h3 className="mb-2 text-2xl font-bold">שקיפות מלאה</h3>
                <h4 className="mb-4 text-lg font-semibold text-orange-600 dark:text-orange-400">
                  אתם תמיד על ההגה
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  מקבלים גישה מלאה לקוד המקור, תשתית ודוחות התקדמות. אנחנו שומרים אתכם על ההגה עם מידע מלא ותהליכי החלטה שקופים.
                </p>
              </div>
            </div>
          </div>
        </div>


        {/* CTA Button - Enhanced positioning and styling */}
        <div className="text-center" data-aos="fade-up">
          <MagneticButton onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            <Button
              size="lg"
              className="inline-flex items-center px-10 py-4 bg-gradient-to-l from-[#00f6ff] to-[#00a7ff] hover:from-[#00f6ff]/80 hover:to-[#00a7ff]/80 text-white font-bold text-lg rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-tech-blue/25 border-0"
            >
              בואו נתחיל לעבוד יחד
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 rtl:mr-0 rtl:ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};