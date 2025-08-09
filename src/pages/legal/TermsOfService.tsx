
import React from 'react';
import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { trackPageView } from '@/lib/analytics';

const TermsOfService = () => {
  useEffect(() => {
    trackPageView('Terms of Service');
  }, []);

  return (
    <div dir="rtl" lang="he" className="min-h-screen bg-white text-dark">
      <Header />
      <main className="container mx-auto px-4 py-10 md:py-16 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">תנאי שימוש</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <p className="mb-4">
              ברוכים הבאים לאתר של SpeedLeads.AI. בכניסתך לאתר זה ובשימוש בו, אתה מסכים לתנאי השימוש המפורטים להלן.
              אם אינך מסכים לתנאים אלה, אנא אל תשתמש באתר.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. שימוש באתר</h2>
            <p>
              כל התוכן המוצג באתר זה, כולל טקסט, גרפיקה, לוגואים, סמלים, תמונות וקוד מחשב, הוא רכוש בלעדי של 
              SpeedLeads.AI ומוגן על ידי חוקי זכויות יוצרים וסימני מסחר. תוכן זה מיועד לשימושך האישי והלא-מסחרי בלבד.
            </p>
            <p className="mt-2">
              אסור לך להעתיק, לשנות, להפיץ או ליצור יצירות נגזרות המבוססות על התוכן של אתר זה, אלא אם ניתנה הרשאה 
              מפורשת בכתב על ידי SpeedLeads.AI.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. דיוק המידע</h2>
            <p>
              אנו משתדלים לוודא שכל המידע באתר מדויק ועדכני. עם זאת, המידע מסופק "כפי שהוא" ללא כל התחייבות, 
              מפורשת או משתמעת, לגבי הדיוק, השלמות או התאמתו למטרה כלשהי.
            </p>
            <p className="mt-2">
              SpeedLeads.AI שומרת לעצמה את הזכות לשנות את התוכן באתר בכל עת ללא הודעה מוקדמת.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. קישורים לאתרים אחרים</h2>
            <p>
              האתר שלנו עשוי להכיל קישורים לאתרים של צדדים שלישיים. קישורים אלה מסופקים לנוחותך בלבד. 
              SpeedLeads.AI אינה מבקרת או מפקחת על תוכן אתרים אלה ואינה אחראית לתוכן שלהם או למדיניות הפרטיות שלהם.
            </p>
            <p className="mt-2">
              הכללת קישורים לאתרים אחרים אינה מהווה המלצה או אישור של תוכן או שירותים באתרים אלה.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. הגבלת אחריות</h2>
            <p>
              בשום מקרה SpeedLeads.AI לא תהיה אחראית לכל נזק, ישיר או עקיף, מיוחד או מקרי, הנובע משימוש באתר זה או 
              מאי-היכולת להשתמש בו, גם אם SpeedLeads.AI הודיעה על אפשרות של נזק כזה.
            </p>
            <p className="mt-2">
              כל החומרים וההצהרות באתר מסופקים לצורכי מידע בלבד ואינם מהווים ייעוץ מקצועי. לפני קבלת החלטות על 
              בסיס המידע באתר, מומלץ להתייעץ עם אנשי מקצוע מתאימים.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. קניין רוחני</h2>
            <p>
              כל התוכן באתר, כולל אך לא מוגבל לטקסט, גרפיקה, לוגואים, סמלים, תמונות, קליפים אודיו, הורדות דיגיטליות 
              וקודי תוכנה, הם רכוש של SpeedLeads.AI או של ספקי התוכן שלה ומוגנים על ידי חוקי זכויות יוצרים ישראליים ובינלאומיים.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. שינויים בתנאי השימוש</h2>
            <p>
              SpeedLeads.AI שומרת לעצמה את הזכות לשנות את תנאי השימוש הללו בכל עת. שינויים כאלה יהיו בתוקף מיד לאחר פרסומם באתר.
              המשך השימוש שלך באתר לאחר פרסום שינויים כאלה מהווה את הסכמתך לתנאים המעודכנים.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. חוק החל</h2>
            <p>
              תנאי שימוש אלה כפופים לחוקי מדינת ישראל ויפורשו בהתאם להם, מבלי לתת תוקף לכל עקרונות התנגשות חוקים.
            </p>
            <p className="mt-2">
              כל מחלוקת הנובעת מתנאים אלה או הקשורה אליהם תהיה כפופה לסמכות השיפוט הבלעדית של בתי המשפט בתל אביב, ישראל.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">8. יצירת קשר</h2>
            <p>
              אם יש לך שאלות כלשהן לגבי תנאי השימוש הללו, אנא צור איתנו קשר:
            </p>
            <p className="mt-2">
              <strong>SpeedLeads.AI</strong><br />
              דוא"ל: info@speedleads.ai<br />
              טלפון: 03-1234567<br />
              כתובת: רחוב הטכנולוגיה 1, תל אביב
            </p>
          </section>

          <section>
            <p className="mt-8 text-sm text-gray-600">
              תאריך עדכון אחרון: 11 במאי, 2025
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
