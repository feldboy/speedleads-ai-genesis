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
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
            <span className="text-white">למה </span>
            <SpeedLeadsLogo size="xl" />
            <span className="text-white">?</span>
          </h1>
          <div className="w-32 h-2 bg-gradient-to-l from-[#00f6ff] to-[#00a7ff] mx-auto mb-8 rounded-full shadow-lg shadow-tech-blue/30" />
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
              <div className="mb-6 overflow-hidden rounded-xl h-48 relative" style={{
                background: 'linear-gradient(135deg, #00A7FF 0%, #00F6FF 50%, #0D1B2A 100%)'
              }}>
                <div className="absolute inset-0 opacity-30" style={{
                  background: 'radial-gradient(circle at 30% 40%, rgba(0,246,255,0.4) 0%, transparent 60%), radial-gradient(circle at 70% 60%, rgba(0,167,255,0.3) 0%, transparent 50%)'
                }} />
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
              <div className="mb-6 overflow-hidden rounded-xl h-48 relative" style={{
                background: 'linear-gradient(135deg, #7C3AED 0%, #3B82F6 50%, #0D1B2A 100%)'
              }}>
                <div className="absolute inset-0 opacity-30" style={{
                  background: 'radial-gradient(circle at 60% 30%, rgba(124,58,237,0.4) 0%, transparent 60%), radial-gradient(circle at 40% 70%, rgba(59,130,246,0.3) 0%, transparent 50%)'
                }} />
              </div>
              <div className="text-center">
                <h3 className="font-display mb-2 text-2xl text-white">ניהול מוצר אסטרטגי</h3>
                <h4 className="mb-4 text-lg font-semibold text-purple-400">
                  אסטרטגיה ברורה, תוצאות מדידות
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  אנחנו מגדירים את המוצר שלכם יחד, בונים MVP מהיר ומניעים צמיחה דרך איטרציות מבוססות נתונים. עם מדדי הצלחה ברורים, תמיד תדעו מה הסטטוס וה-ROI של הפרויקט.
                </p>
              </div>
            </GlowCard>

            {/* Feature 3 */}
            <GlowCard className="rounded-2xl p-8 lg:col-span-5" data-aos="fade-up" data-aos-delay="200">
              <div className="mb-6 overflow-hidden rounded-xl h-48 relative" style={{
                background: 'linear-gradient(135deg, #10B981 0%, #06B6D4 50%, #0D1B2A 100%)'
              }}>
                <div className="absolute inset-0 opacity-30" style={{
                  background: 'radial-gradient(circle at 40% 50%, rgba(16,185,129,0.4) 0%, transparent 60%), radial-gradient(circle at 70% 30%, rgba(6,182,212,0.3) 0%, transparent 50%)'
                }} />
              </div>
              <div className="text-center">
                <h3 className="font-display mb-2 text-2xl text-white">איכות וביצועים</h3>
                <h4 className="mb-4 text-lg font-semibold text-green-400">
                  יציב, מאובטח ומהיר
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  אנחנו בונים לפי הסטנדרטים הגבוהים ביותר עם בדיקות אוטומטיות, פרוטוקולי אבטחה מקיפים וזמני טעינה מהירים מותאמים להצלחה ב-SEO.
                </p>
              </div>
            </GlowCard>

            {/* Feature 4 */}
            <GlowCard className="rounded-2xl p-8 lg:col-span-7" data-aos="fade-up" data-aos-delay="250">
              <div className="mb-6 overflow-hidden rounded-xl h-48 relative" style={{
                background: 'linear-gradient(135deg, #F59E0B 0%, #B08D57 50%, #0D1B2A 100%)'
              }}>
                <div className="absolute inset-0 opacity-30" style={{
                  background: 'radial-gradient(circle at 50% 40%, rgba(245,158,11,0.4) 0%, transparent 60%), radial-gradient(circle at 30% 70%, rgba(176,141,87,0.3) 0%, transparent 50%)'
                }} />
              </div>
              <div className="text-center">
                <h3 className="font-display mb-2 text-2xl text-white">שקיפות מלאה</h3>
                <h4 className="mb-4 text-lg font-semibold text-orange-400">
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
