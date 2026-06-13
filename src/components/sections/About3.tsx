import { Button } from "@/components/ui/button";
import MagneticButton from "@/components/effects/MagneticButton";
import SpeedLeadsLogo from "@/components/ui/SpeedLeadsLogo";
import GlowCard from "@/components/ui/GlowCard";

export const About3 = () => {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">

      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-16 text-center max-w-4xl mx-auto" data-aos="fade-up">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
            <span className="text-white">למה </span>
            <SpeedLeadsLogo size="xl" />
            <span className="text-white">?</span>
          </h2>
          <div className="w-32 h-2 bg-gradient-to-l from-[color:var(--btn-from,#00f6ff)] to-[color:var(--btn-to,#00a7ff)] mx-auto mb-8 rounded-full shadow-lg shadow-tech-blue/30" />
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            פתרונות AI מתקדמים שחוסכים זמן, משפרים דיוק ומאפשרים לכם להתמקד במה שחשוב באמת
          </p>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="font-display text-3xl lg:text-4xl mb-4 text-white">מה מייחד אותנו</h2>
            <p className="text-gray-400 text-lg">ארבעה עמודי התווך שלנו להצלחה שלכם</p>
          </div>

          <div className="grid gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-12 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <GlowCard className="rounded-2xl p-8 lg:col-span-7" data-aos="fade-up" data-aos-delay="100">
              <div className="mb-6 overflow-hidden rounded-xl h-48 relative bg-[#0D1B2A]">
                <img
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=900&h=400&fit=crop&auto=format&q=80"
                  alt="צוות SpeedLeads בפגישת עבודה ושיתוף פעולה צמוד עם לקוח"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-[#0D1B2A]/35 to-transparent" />
                <div className="absolute inset-0 bg-[#00A7FF]/15 mix-blend-overlay" />
              </div>
              <div className="text-center">
                <h3 className="font-display mb-2 text-2xl text-white">שירות אישי</h3>
                <h4 className="mb-4 text-lg font-semibold text-blue-400">
                  שותפות אמיתית והתחייבות
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  אתם מקבלים מנהל פרויקט ייעודי, זמינות גבוהה ותמיכה הרבה אחרי ההשקה. אנחנו השותפים שלכם בכל שלב - מאסטרטגיה ראשונית ועד תחזוקה שוטפת.
                </p>
              </div>
            </GlowCard>

            {/* Feature 2 */}
            <GlowCard className="rounded-2xl p-8 lg:col-span-5" data-aos="fade-up" data-aos-delay="150">
              <div className="mb-6 overflow-hidden rounded-xl h-48 relative bg-[#0D1B2A]">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=400&fit=crop&auto=format&q=80"
                  alt="ניתוח נתונים, מדדי הצלחה ו-ROI על מסך מחשב"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-[#0D1B2A]/35 to-transparent" />
                <div className="absolute inset-0 bg-[#0072E5]/15 mix-blend-overlay" />
              </div>
              <div className="text-center">
                <h3 className="font-display mb-2 text-2xl text-white">ניהול מוצר אסטרטגי</h3>
                <h4 className="mb-4 text-lg font-semibold text-sky-400">
                  אסטרטגיה ברורה, תוצאות מדידות
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  אנחנו מגדירים את המוצר שלכם יחד, בונים MVP מהיר ומניעים צמיחה דרך איטרציות מבוססות נתונים. עם מדדי הצלחה ברורים, תמיד תדעו מה הסטטוס וה-ROI של הפרויקט.
                </p>
              </div>
            </GlowCard>

            {/* Feature 3 */}
            <GlowCard className="rounded-2xl p-8 lg:col-span-5" data-aos="fade-up" data-aos-delay="200">
              <div className="mb-6 overflow-hidden rounded-xl h-48 relative bg-[#0D1B2A]">
                <img
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&h=400&fit=crop&auto=format&q=80"
                  alt="קוד נקי, מאובטח ומהיר על מסך מחשב"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-[#0D1B2A]/35 to-transparent" />
                <div className="absolute inset-0 bg-[#06B6D4]/15 mix-blend-overlay" />
              </div>
              <div className="text-center">
                <h3 className="font-display mb-2 text-2xl text-white">איכות וביצועים</h3>
                <h4 className="mb-4 text-lg font-semibold text-cyan-400">
                  יציב, מאובטח ומהיר
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  אנחנו בונים לפי הסטנדרטים הגבוהים ביותר עם בדיקות אוטומטיות, פרוטוקולי אבטחה מקיפים וזמני טעינה מהירים מותאמים להצלחה ב-SEO.
                </p>
              </div>
            </GlowCard>

            {/* Feature 4 */}
            <GlowCard className="rounded-2xl p-8 lg:col-span-7" data-aos="fade-up" data-aos-delay="250">
              <div className="mb-6 overflow-hidden rounded-xl h-48 relative bg-[#0D1B2A]">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&h=400&fit=crop&auto=format&q=80"
                  alt="פגישת התקדמות שקופה עם דוחות, נתונים וגישה מלאה ללקוח"
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-[#0D1B2A]/35 to-transparent" />
                <div className="absolute inset-0 bg-[#00C2E0]/15 mix-blend-overlay" />
              </div>
              <div className="text-center">
                <h3 className="font-display mb-2 text-2xl text-white">שקיפות מלאה</h3>
                <h4 className="mb-4 text-lg font-semibold text-cyan-300">
                  אתם תמיד על ההגה
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  מקבלים גישה מלאה לקוד המקור, תשתית ודוחות התקדמות. אנחנו שומרים אתכם על ההגה עם מידע מלא ותהליכי החלטה שקופים.
                </p>
              </div>
            </GlowCard>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center" data-aos="fade-up">
          <MagneticButton onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            <Button
              size="lg"
              className="inline-flex items-center px-10 py-4 bg-gradient-to-l from-[color:var(--btn-from,#00f6ff)] to-[color:var(--btn-to,#00a7ff)] hover:brightness-110 text-white font-bold text-lg rounded-full transition-all duration-300 shadow-2xl hover:shadow-tech-blue/25 border-0"
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
