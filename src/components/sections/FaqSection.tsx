import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import MagneticButton from '@/components/effects/MagneticButton';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    id: "faq_question_1",
    question: "כמה זמן לוקח פרויקט ממוצע?",
    answer: "משך הזמן משתנה בהתאם לסוג הפרויקט ומורכבותו. בדרך כלל, דף נחיתה בסיסי יכול להיות מוכן תוך 1-2 שבועות, אתר תדמית תוך 3-4 שבועות, ופרויקטים מורכבים יותר כמו חנויות אונליין או מערכות אוטומציה מותאמות אישית יכולים לקחת 6-12 שבועות. אנו מספקים לוח זמנים מפורט לכל פרויקט בתחילת העבודה."
  },
  {
    id: "faq_question_2",
    question: "האם אתם מציעים תמיכה לאחר סיום הפרויקט?",
    answer: "בהחלט! אנו מציעים מגוון חבילות תמיכה ותחזוקה שוטפת לאחר השקת הפרויקט. החבילות כוללות עדכונים, גיבויים, אבטחה, תיקוני באגים, ואף שדרוגים קלים. אנו מאמינים שהקשר עם לקוחותינו הוא לטווח ארוך, ונשמח לתמוך בהצלחת הפרויקט גם לאחר ההשקה."
  },
  {
    id: "faq_question_3",
    question: "אילו טכנולוגיות AI אתם משלבים?",
    answer: "אנו עובדים עם מגוון רחב של טכנולוגיות AI מתקדמות, ביניהן: צ'אטבוטים חכמים מבוססי LLM, מערכות המלצות אישיות למשתמשים, אלגוריתמי למידת מכונה לניתוח התנהגות משתמשים, מנועי חיפוש סמנטי משופרים, כלי ניתוח תוכן ויצירת תוכן אוטומטי, ואינטגרציות עם פלטפורמות AI מובילות כמו OpenAI, Google AI ואחרות. אנו בוחרים את הפתרון הטכנולוגי המתאים ביותר לצרכי הפרויקט הספציפי."
  },
  {
    id: "faq_question_4",
    question: "מהו התהליך לעבודה משותפת?",
    answer: "התהליך שלנו מורכב מכמה שלבים מובנים: 1) פגישת אפיון ראשונית להבנת הצרכים והמטרות שלכם. 2) הצעת מחיר מפורטת הכוללת אפיון ראשוני ולוח זמנים. 3) עיצוב ואישור קונספט ויזואלי. 4) פיתוח והתקדמות בשלבים עם נקודות אישור. 5) בדיקות מקיפות ושיפורים. 6) השקה והדרכה. 7) תמיכה שוטפת והמשך שיתוף פעולה. לאורך כל התהליך, תהיו מעורבים ותקבלו עדכונים שוטפים."
  },
  {
    id: "faq_question_6",
    question: "איך אתם מבטיחים שהפרויקט יעמוד בציפיות שלנו?",
    answer: "אנו משקיעים זמן רב בתהליך האפיון הראשוני כדי להבין לעומק את הציפיות, המטרות והצרכים שלכם. אנו עובדים בשיטת פיתוח אג'ילית (Agile) המאפשרת משוב מתמיד ואיטרציות שוטפות. במהלך הפרויקט, אנו מקיימים פגישות סטטוס קבועות ומספקים גישה למערכת ניהול הפרויקט שלנו, כך שתוכלו לעקוב אחר ההתקדמות בזמן אמת. בנוסף, כל שלב מחייב את האישור שלכם לפני שאנו ממשיכים, מה שמבטיח שהתוצאה הסופית תתאים בדיוק למה שציפיתם."
  }
];

const FaqSection = () => {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-aos="fade-up">שאלות נפוצות</h2>
          <div className="w-24 h-1 bg-gradient-to-l from-[#00f6ff] to-[#00a7ff] mx-auto mb-8" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            כאן תוכלו למצוא מענה לשאלות הנפוצות ביותר. לא מצאתם את מה שחיפשתם? צרו איתנו קשר!
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={faq.id} 
              className="border-b border-gray-200 py-4 last:border-b-0" 
              data-aos="fade-up" 
              data-aos-delay={index * 100}
            >
              <button
                type="button"
                id={`faq_question_toggle_${faq.id}`}
                className="w-full flex justify-between items-center text-right focus:outline-none"
                onClick={() => toggleFaq(faq.id)}
                aria-expanded={openFaq === faq.id}
                aria-controls={`faq_answer_${faq.id}`}
              >
                <span className="text-xl font-medium text-dark">{faq.question}</span>
                <svg 
                  className={`w-5 h-5 text-dark transition-transform ${openFaq === faq.id ? 'transform rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <title>Toggle FAQ</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === faq.id && (
                <div 
                  id={`faq_answer_${faq.id}`} 
                  className="mt-4 text-gray-600 pr-6 animate-fade-in" // Keeping existing fade-in for accordion open
                > 
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12" data-aos="fade-up">
          <p className="text-lg text-gray-600 mb-6">עדיין יש לכם שאלות?</p>
          <MagneticButton onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            <Button 
              id="faq_contact_button"
              size="lg"
              className="bg-gradient-to-l from-[#00f6ff] to-[#00a7ff] hover:from-[#00f6ff]/80 hover:to-[#00a7ff]/80 text-white font-bold transition-all duration-300 shadow-lg hover:shadow-tech-blue/25"
            >
              דברו איתנו ישירות
            </Button>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
