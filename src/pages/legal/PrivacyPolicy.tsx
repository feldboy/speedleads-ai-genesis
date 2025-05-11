
import React from 'react';
import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { trackPageView } from '@/lib/analytics';

const PrivacyPolicy = () => {
  useEffect(() => {
    trackPageView('Privacy Policy');
  }, []);

  return (
    <div dir="rtl" lang="he" className="min-h-screen bg-white text-dark">
      <Header />
      <main className="container mx-auto px-4 py-10 md:py-16 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">מדיניות פרטיות</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">מבוא</h2>
            <p>
              אנו ב-SpeedLeads.AI מתייחסים בכבוד לפרטיות שלך. מסמך זה מפרט את המידע שאנו אוספים, כיצד אנו משתמשים בו,
              ואת הזכויות שלך בנוגע למידע האישי שלך.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">מידע שאנו אוספים</h2>
            <p>אנו עשויים לאסוף את סוגי המידע הבאים:</p>
            <ul className="list-disc list-inside my-4">
              <li><strong>מידע אישי</strong> - כגון שם, כתובת אימייל, מספר טלפון ושם החברה שלך שאתה מספק לנו באופן ישיר כאשר אתה יוצר קשר או ממלא טפסים באתר.</li>
              <li><strong>מידע על השימוש שלך באתר</strong> - כגון כתובת ה-IP שלך, מידע על הדפדפן והמכשיר, זמן הביקור, העמודים שבהם ביקרת והקישורים שעליהם לחצת.</li>
              <li><strong>תקשורת</strong> - תוכן של הודעות או תכתובות שאתה שולח אלינו.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">כיצד אנו משתמשים במידע</h2>
            <p>אנו משתמשים במידע שאנו אוספים למטרות הבאות:</p>
            <ul className="list-disc list-inside my-4">
              <li>לספק לך את השירותים שלנו ולתקשר איתך.</li>
              <li>להגיב לשאלות או בקשות שלך.</li>
              <li>לשפר את האתר והשירותים שלנו.</li>
              <li>לנתח כיצד משתמשים משתמשים באתר שלנו.</li>
              <li>לשלוח לך מידע שיווקי (אם הסכמת לכך).</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">שמירה ואבטחת מידע</h2>
            <p>
              אנו נוקטים באמצעים טכניים וארגוניים סבירים כדי לשמור על המידע שלך מאובטח. עם זאת, אין שיטת העברה באינטרנט או שיטת אחסון אלקטרונית שהיא מאובטחת ב-100%. לכן, בעוד שאנו שואפים להגן על המידע האישי שלך, איננו יכולים להבטיח את הביטחון המוחלט שלו.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">שיתוף מידע עם צדדים שלישיים</h2>
            <p>
              אנו לא מוכרים את המידע האישי שלך. אנו עשויים לחלוק מידע עם:
            </p>
            <ul className="list-disc list-inside my-4">
              <li>ספקי שירות צד שלישי המסייעים לנו בהפעלת האתר והעסק שלנו.</li>
              <li>גופי אכיפת חוק או רשויות ממשלתיות כאשר נדרש על פי חוק.</li>
              <li>גופים אחרים, בהסכמתך.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">עוגיות (Cookies)</h2>
            <p>
              אנו משתמשים בעוגיות ובטכנולוגיות מעקב דומות לשיפור חווית המשתמש שלך באתר שלנו. למידע נוסף, אנא עיין ב<a href="/cookies" className="text-tech-blue hover:underline">מדיניות העוגיות</a> שלנו.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">הזכויות שלך</h2>
            <p>
              בהתאם לחוקים החלים, יש לך זכויות מסוימות בנוגע למידע האישי שלך, כולל:
            </p>
            <ul className="list-disc list-inside my-4">
              <li>הזכות לגשת למידע האישי שלך.</li>
              <li>הזכות לתקן מידע לא מדויק.</li>
              <li>הזכות למחוק את המידע שלך.</li>
              <li>הזכות להתנגד לעיבוד המידע שלך.</li>
              <li>הזכות להגביל את העיבוד של המידע שלך.</li>
              <li>הזכות לקבל את המידע שלך בפורמט נייד.</li>
            </ul>
            <p>
              כדי לממש את זכויותיך אלה, אנא צור איתנו קשר באמצעות פרטי הקשר המופיעים בתחתית מדיניות זו.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">שינויים במדיניות הפרטיות</h2>
            <p>
              אנו עשויים לעדכן את מדיניות הפרטיות שלנו מעת לעת. אנו נפרסם כל שינוי במדיניות הפרטיות באתר זה ונעדכן את תאריך העדכון האחרון.
            </p>
            <p>
              תאריך עדכון אחרון: 11 במאי, 2025
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">צור קשר</h2>
            <p>
              אם יש לך שאלות כלשהן לגבי מדיניות הפרטיות שלנו או כיצד אנו מטפלים במידע שלך, אנא צור איתנו קשר:
            </p>
            <p className="mt-2">
              <strong>SpeedLeads.AI</strong><br />
              דוא"ל: info@speedleads.ai<br />
              טלפון: 03-1234567<br />
              כתובת: רחוב הטכנולוגיה 1, תל אביב
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
