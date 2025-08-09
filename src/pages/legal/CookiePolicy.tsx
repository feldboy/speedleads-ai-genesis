
import React from 'react';
import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { trackPageView } from '@/lib/analytics';

const CookiePolicy = () => {
  useEffect(() => {
    trackPageView('Cookie Policy');
  }, []);

  return (
    <div dir="rtl" lang="he" className="min-h-screen bg-white text-dark">
      <Header />
      <main className="container mx-auto px-4 py-10 md:py-16 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">מדיניות עוגיות</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">מהן עוגיות?</h2>
            <p>
              עוגיות הן קבצי טקסט קטנים שמאוחסנים במכשיר שלך (מחשב, טלפון נייד או טאבלט) כאשר אתה מבקר באתר.
              הן מאפשרות לאתר לזכור את פעולותיך והעדפותיך לאורך זמן, כך שלא תצטרך להזין אותן מחדש בכל פעם שאתה מבקר באתר
              או עובר מדף אחד לאחר.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">כיצד אנו משתמשים בעוגיות</h2>
            <p>
              אנו משתמשים בעוגיות למספר מטרות שונות. חלקן הכרחיות לתפקוד האתר, בעוד שאחרות מאפשרות לנו לשפר את החוויה שלך, 
              לזכור את ההעדפות שלך ולספק לך תוכן ופרסומות רלוונטיים יותר.
            </p>
            <p className="mt-2">
              הקטגוריות העיקריות של העוגיות בהן אנו משתמשים הן:
            </p>
            <ul className="list-disc list-inside my-4">
              <li>
                <strong>עוגיות הכרחיות:</strong> עוגיות אלה נדרשות כדי לאפשר לך לגלוש באתר ולהשתמש בתכונות חיוניות 
                כמו אזורים מאובטחים וסלי קניות. ללא עוגיות אלה, השירותים שביקשת לא יהיו זמינים.
              </li>
              <li>
                <strong>עוגיות ביצועים:</strong> עוגיות אלה אוספות מידע על האופן בו מבקרים משתמשים באתר שלנו, 
                למשל אילו דפים הם מבקרים בתדירות הגבוהה ביותר ואם הם מקבלים הודעות שגיאה. מידע זה עוזר לנו לשפר את האתר שלנו.
              </li>
              <li>
                <strong>עוגיות פונקציונליות:</strong> עוגיות אלה מאפשרות לאתר לזכור בחירות שאתה עושה ולספק תכונות מותאמות אישית.
              </li>
              <li>
                <strong>עוגיות פרסום ומיקוד:</strong> עוגיות אלה משמשות להציג פרסומות שרלוונטיות יותר עבורך ותחומי העניין שלך.
              </li>
              <li>
                <strong>עוגיות מדיה חברתית:</strong> עוגיות אלה מאפשרות לך לשתף את הפעילות שלך באתר ברשתות חברתיות כמו פייסבוק ולינקדאין.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">עוגיות צד שלישי</h2>
            <p>
              בנוסף לעוגיות שלנו, אנו מאפשרים לצדדים שלישיים מסוימים להציב עוגיות כאשר אתה מבקר באתר שלנו.
              אלה כוללים שירותים אנליטיים כמו Google Analytics, שעוזרים לנו להבין כיצד מבקרים משתמשים באתר שלנו, 
              ורשתות פרסום שעשויות לעקוב אחר הביקור שלך כדי להציג לך פרסומות רלוונטיות יותר באתרים אחרים.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">ניהול העדפות העוגיות שלך</h2>
            <p>
              רוב דפדפני האינטרנט מאפשרים לך לנהל את העדפות העוגיות שלך. אתה יכול להגדיר את הדפדפן שלך לדחות עוגיות מסוימות או את כולן,
              או להתריע בפניך כאשר אתרים מבקשים להציב עוגיות במכשיר שלך.
            </p>
            <p className="mt-2">
              שים לב שחסימת או מחיקת עוגיות עלולה להשפיע על חווית המשתמש שלך ויתכן שחלק מהתכונות או השירותים באתר שלנו לא יפעלו כראוי.
            </p>
            <p className="mt-2">
              כדי לנהל את העדפות העוגיות שלך, אנא עיין בעזרה של הדפדפן שלך או בקר בקישורים הבאים:
            </p>
            <ul className="list-disc list-inside my-4 text-tech-blue">
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
              <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
              <li><a href="https://support.apple.com/en-il/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Apple Safari</a></li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">שינויים במדיניות העוגיות</h2>
            <p>
              אנו עשויים לעדכן את מדיניות העוגיות שלנו מעת לעת. אנו נפרסם כל שינוי במדיניות העוגיות באתר זה ונעדכן את 
              תאריך העדכון האחרון.
            </p>
            <p className="mt-2">
              תאריך עדכון אחרון: 11 במאי, 2025
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">צור קשר</h2>
            <p>
              אם יש לך שאלות כלשהן לגבי השימוש שלנו בעוגיות, אנא צור איתנו קשר:
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

export default CookiePolicy;
