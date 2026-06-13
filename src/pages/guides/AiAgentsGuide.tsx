import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Seo from '@/components/Seo';
import { Button } from '@/components/ui/button';
import MagneticButton from '@/components/effects/MagneticButton';
import { trackPageView } from '@/lib/analytics';

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'סוכני AI לעסקים: המדריך המלא לאוטומציה חכמה של תהליכי עבודה',
  description:
    'מה הם סוכני AI, איך הם שונים מצ׳אטבוט רגיל, ואיך הם הופכים תהליכי עבודה עסקיים — לידים, שירות לקוחות, תיאום ותפעול — לאוטומטיים. מדריך מעשי מ-SpeedLeads.AI.',
  inLanguage: 'he-IL',
  author: { '@id': 'https://www.speedleads-ai.com/#organization' },
  publisher: { '@id': 'https://www.speedleads-ai.com/#organization' },
  image: 'https://www.speedleads-ai.com/speedleads-logo.png',
  mainEntityOfPage: 'https://www.speedleads-ai.com/guide/ai-agents',
};

const AiAgentsGuide = () => {
  useEffect(() => {
    trackPageView('Guide: AI Agents');
  }, []);

  return (
    <div dir="rtl" lang="he" className="min-h-screen bg-abyss text-white">
      <Seo
        title="סוכני AI לעסקים — מדריך לאוטומציה עסקית חכמה | SpeedLeads.AI"
        description="מה הם סוכני AI ואיך הם הופכים תהליכי עבודה עסקיים לאוטומטיים: לידים, שירות לקוחות, תיאום פגישות ותפעול. מדריך מעשי מ-SpeedLeads.AI."
        path="/guide/ai-agents"
        jsonLd={articleJsonLd}
      />
      <Header />

      <main className="container mx-auto px-4 pt-28 pb-20 md:pt-36 md:pb-28 max-w-3xl">
        <article>
          <header className="mb-12 text-center">
            <p className="text-sm font-medium text-tech-blue mb-4 tracking-wide">מדריך · אוטומציה עסקית מבוססת AI</p>
            <h1 className="font-display text-3xl md:text-5xl leading-tight mb-6">
              <span className="text-brand-gradient">סוכני AI לעסקים</span>
              <span className="text-white">: המדריך לאוטומציה חכמה של תהליכי עבודה</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              סוכני AI (AI agents) הם הדור הבא של האוטומציה העסקית — לא עוד תסריט נוקשה, אלא מערכת
              שמבינה מטרה, מקבלת החלטות ומבצעת משימות שלמות בשמכם. במדריך הזה נסביר מה הם, איפה הם
              מייצרים ערך אמיתי לעסק, ואיך מטמיעים אותם נכון.
            </p>
          </header>

          <div className="space-y-12 text-gray-200 leading-relaxed text-base md:text-lg">
            <section>
              <h2 className="font-display text-2xl md:text-3xl text-white mb-4">מה הם סוכני AI?</h2>
              <p className="mb-4">
                סוכן AI הוא תוכנה מבוססת בינה מלאכותית שמקבלת מטרה מנוסחת בשפה טבעית, מפרקת אותה
                לצעדים, ומבצעת אותם בעצמה — כולל שימוש בכלים חיצוניים, גישה למסדי נתונים ותקשורת
                עם לקוחות. בניגוד לאוטומציה מסורתית, הפועלת לפי חוקים קשיחים מראש, סוכן AI יודע
                להתמודד עם מצבים לא צפויים, לשאול שאלות הבהרה ולהתאים את עצמו להקשר.
              </p>
              <p>
                במילים פשוטות: צ׳אטבוט עונה על שאלה. סוכן AI מסיים משימה.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl md:text-3xl text-white mb-4">סוכן AI מול צ׳אטבוט — מה ההבדל?</h2>
              <p className="mb-4">
                צ׳אטבוט קלאסי מנהל שיחה ומחזיר תשובות מתוך מאגר ידע. סוכן AI, לעומת זאת, פועל:
                הוא יכול לבדוק יומן ולקבוע פגישה, לעדכן כרטיס לקוח ב-CRM, לשלוח הצעת מחיר, או
                לפתוח קריאת שירות — כל זאת מבלי שאדם יצטרך ללחוץ על כפתור בכל שלב.
              </p>
              <ul className="list-disc list-inside space-y-2 marker:text-tech-blue">
                <li><strong className="text-white">צ׳אטבוט:</strong> מגיב, מנהל שיחה, מפנה לנציג.</li>
                <li><strong className="text-white">סוכן AI:</strong> יוזם, מקבל החלטות, מבצע פעולות בין מערכות.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl md:text-3xl text-white mb-4">תהליכי עבודה שסוכני AI מייעלים</h2>
              <p className="mb-6">
                הערך הגדול ביותר של סוכני AI נמצא בתהליכים חוזרים, רגישים לזמן וכאלה שדורשים
                חיבור בין כמה מערכות. אלו הם התחומים שבהם אנחנו ב-SpeedLeads.AI רואים את ההחזר
                המהיר ביותר על ההשקעה:
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="glass-liquid rounded-xl p-5">
                  <h3 className="text-xl font-semibold text-white mb-2">ניהול ומענה ללידים</h3>
                  <p className="text-gray-300 text-base">
                    סוכן שמזהה ליד חדש, מסווג אותו לפי איכות, עונה תוך שניות בערוץ המועדף על הלקוח
                    וקובע פגישה — לפני שהמתחרה בכלל הספיק להתקשר.
                  </p>
                </div>
                <div className="glass-liquid rounded-xl p-5">
                  <h3 className="text-xl font-semibold text-white mb-2">שירות לקוחות</h3>
                  <p className="text-gray-300 text-base">
                    מענה 24/7 לשאלות נפוצות, פתיחת קריאות שירות, מעקב אחרי הזמנות והסלמה לנציג
                    אנושי רק כשבאמת צריך.
                  </p>
                </div>
                <div className="glass-liquid rounded-xl p-5">
                  <h3 className="text-xl font-semibold text-white mb-2">תיאום ותזמון</h3>
                  <p className="text-gray-300 text-base">
                    תיאום פגישות, תזכורות אוטומטיות והפחתת אי-הגעות — תוך סנכרון מלא עם היומן
                    ומערכות הניהול שלכם.
                  </p>
                </div>
                <div className="glass-liquid rounded-xl p-5">
                  <h3 className="text-xl font-semibold text-white mb-2">תפעול ונתונים</h3>
                  <p className="text-gray-300 text-base">
                    הזנת נתונים, הפקת דוחות, סיכום מסמכים וסנכרון מידע בין מערכות — משימות
                    שגוזלות שעות, מבוצעות אוטומטית וללא טעויות.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display text-2xl md:text-3xl text-white mb-4">היתרונות העסקיים</h2>
              <ul className="list-disc list-inside space-y-2 marker:text-tech-blue">
                <li><strong className="text-white">מהירות תגובה:</strong> מענה מיידי שמגדיל המרות לידים.</li>
                <li><strong className="text-white">חיסכון בעלויות:</strong> פחות עבודה ידנית חוזרת, יותר זמן למשימות בעלות ערך.</li>
                <li><strong className="text-white">זמינות מלאה:</strong> פעילות מסביב לשעון, גם כשהמשרד סגור.</li>
                <li><strong className="text-white">עקביות ודיוק:</strong> אותו סטנדרט שירות בכל פנייה, ללא שגיאות אנוש.</li>
                <li><strong className="text-white">יכולת התרחבות:</strong> טיפול במאות פניות במקביל בלי לגייס כוח אדם נוסף.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-2xl md:text-3xl text-white mb-4">איך מטמיעים סוכן AI נכון?</h2>
              <p className="mb-4">
                הטמעה מוצלחת מתחילה בתהליך עסקי ספציפי, לא בטכנולוגיה. זו הגישה שלנו:
              </p>
              <ol className="list-decimal list-inside space-y-2 marker:text-tech-blue">
                <li>מיפוי התהליך שגוזל הכי הרבה זמן או מפספס הכי הרבה לידים.</li>
                <li>הגדרת המטרה, הגבולות והמקרים שבהם נדרש אדם בלולאה.</li>
                <li>חיבור הסוכן למערכות הקיימות שלכם (CRM, יומן, ווטסאפ, אימייל).</li>
                <li>הרצת פיילוט מבוקר, מדידה ושיפור על בסיס נתונים אמיתיים.</li>
                <li>הרחבה הדרגתית לתהליכים נוספים לאחר שהוכח הערך.</li>
              </ol>
            </section>

            <section className="glass-liquid rounded-2xl p-8 text-center">
              <h2 className="font-display text-2xl md:text-3xl text-white mb-3">רוצים סוכן AI שעובד בשבילכם?</h2>
              <p className="text-gray-300 mb-6 max-w-xl mx-auto">
                ב-SpeedLeads.AI אנחנו בונים סוכני AI מותאמים אישית שמתחברים למערכות הקיימות
                שלכם ומתחילים לייצר ערך מהיום הראשון. בואו נאפיין יחד את התהליך הראשון לאוטומציה.
              </p>
              <MagneticButton>
                <Link to="/#contact">
                  <Button
                    id="guide_ai_agents_cta_button"
                    size="lg"
                    className="bg-gradient-to-l from-[color:var(--btn-from,#00f6ff)] to-[color:var(--btn-to,#00a7ff)] hover:brightness-110 text-white font-bold transition-all duration-300 shadow-lg hover:shadow-tech-blue/25"
                  >
                    בואו נדבר על העסק שלכם
                  </Button>
                </Link>
              </MagneticButton>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default AiAgentsGuide;
