
import React from 'react';
import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { trackPageView } from '@/lib/analytics';

const AccessibilityStatement = () => {
  useEffect(() => {
    trackPageView('Accessibility Statement');
  }, []);

  return (
    <div dir="rtl" lang="he" className="min-h-screen bg-white text-dark">
      <Header />
      <main className="container mx-auto px-4 py-10 md:py-16 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">הצהרת נגישות</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">המחויבות שלנו לנגישות</h2>
            <p>
              SpeedLeads.AI מחויבת לאפשר לכל אדם, כולל אנשים עם מוגבלויות, לגשת ולהשתמש באתר האינטרנט שלנו.
              אנו שואפים לעמוד בהנחיות הנגישות המקובלות ולשפר באופן מתמיד את חוויית המשתמש עבור כל המבקרים באתר שלנו.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">תאימות לתקנים</h2>
            <p>
              האתר שלנו נבנה תוך שאיפה לעמוד בהנחיות הנגישות הבאות:
            </p>
            <ul className="list-disc list-inside my-4">
              <li>תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג-2013</li>
              <li>תקן ישראלי לנגישות אתרי אינטרנט (ת"י 5568)</li>
              <li>הנחיות נגישות לתוכן באינטרנט (WCAG) 2.1 ברמה AA</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">תכונות נגישות באתר</h2>
            <p>
              כחלק מהמחויבות שלנו לנגישות, האתר שלנו כולל את התכונות הבאות:
            </p>
            <ul className="list-disc list-inside my-4">
              <li>
                <strong>תפריט נגישות:</strong> תפריט מיוחד המאפשר התאמות שונות כגון שינוי גודל הטקסט,
                ניגודיות גבוהה והשבתת אנימציות.
              </li>
              <li>
                <strong>תאימות לקורא מסך:</strong> האתר שלנו תומך בתוכנות קריאת מסך כמו NVDA, JAWS ו-VoiceOver.
              </li>
              <li>
                <strong>ניווט מקלדת:</strong> כל האתר ניתן לניווט באמצעות המקלדת בלבד, בעזרת מקש Tab ומקשי החצים.
              </li>
              <li>
                <strong>תיאורי תמונות:</strong> כל התמונות באתר כוללות תיאור טקסטואלי (alt text).
              </li>
              <li>
                <strong>מבנה סמנטי:</strong> אנו משתמשים בתגיות HTML5 סמנטיות ובמבנה היררכי ברור לתוכן שלנו.
              </li>
              <li>
                <strong>גודל טקסט מתכוונן:</strong> המשתמשים יכולים להגדיל את גודל הטקסט באתר ללא אובדן תוכן או פונקציונליות.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">מגבלות ידועות</h2>
            <p>
              למרות מאמצינו, ייתכן שחלקים מסוימים באתר עדיין אינם נגישים באופן מלא. אנו עובדים באופן מתמיד לשיפור
              הנגישות של האתר שלנו ומתכננים לטפל בסוגיות הבאות בעתיד:
            </p>
            <ul className="list-disc list-inside my-4">
              <li>שיפור נגישות חלק מהטפסים באתר</li>
              <li>שיפור נגישות תוכן מדיה מסוים</li>
              <li>הוספת כתוביות וטקסט חלופי לכל תוכן הווידאו</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">טכנולוגיות תומכות</h2>
            <p>
              האתר שלנו תומך בטכנולוגיות הנגישות הבאות:
            </p>
            <ul className="list-disc list-inside my-4">
              <li>דפדפנים מודרניים כגון Google Chrome, Mozilla Firefox, Microsoft Edge ו-Apple Safari בגרסאותיהם העדכניות</li>
              <li>תוכנות קריאת מסך כגון NVDA, JAWS ו-VoiceOver</li>
              <li>תוכנות הגדלה</li>
              <li>טכנולוגיות זיהוי קול</li>
              <li>מקלדות אלטרנטיביות ואמצעי קלט מותאמים</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">משוב ויצירת קשר</h2>
            <p>
              אנו מקדמים בברכה משוב על נגישות האתר שלנו. אם נתקלת בבעיות כלשהן בגישה לתוכן באתר,
              או אם יש לך הצעות לשיפור הנגישות, אנא צור איתנו קשר:
            </p>
            <p className="mt-2">
              <strong>SpeedLeads.AI</strong><br />
              דוא"ל: info@speedleads.ai<br />
              טלפון: 03-1234567<br />
              כתובת: רחוב הטכנולוגיה 1, תל אביב
            </p>
            <p className="mt-2">
              אנו נעשה את מיטב מאמצינו לטפל בבעיות הנגישות בהקדם האפשרי.
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

export default AccessibilityStatement;
