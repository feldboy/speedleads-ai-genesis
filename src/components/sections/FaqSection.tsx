import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import MagneticButton from '@/components/effects/MagneticButton';
import { Plus, Minus } from 'lucide-react';

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
    answer: "אנו עובדים עם מגוון רחב של טכנולוגיות AI מתקדמות, ביניהן: צ'אטבוטים חכמים מבוססי LLM, מערכות המלצות אישיות למשתמשים, אלגוריתמי למידת מכונה לניתוח התנהגות משתמשים, מנועי חיפוש סמנטי משופרים, כלי ניתוח תוכן ויצירת תוכן אוטומטי, ואינטגרציות עם פלטפורמות AI מובילות כמו OpenAI, Google AI ואחרות."
  },
  {
    id: "faq_question_4",
    question: "מהו התהליך לעבודה משותפת?",
    answer: "התהליך שלנו מורכב מכמה שלבים מובנים: פגישת אפיון ראשונית, הצעת מחיר מפורטת, עיצוב ואישור קונספט ויזואלי, פיתוח בשלבים עם נקודות אישור, בדיקות מקיפות ושיפורים, השקה והדרכה, ולבסוף תמיכה שוטפת. לאורך כל התהליך, תהיו מעורבים ותקבלו עדכונים שוטפים."
  },
  {
    id: "faq_question_6",
    question: "איך אתם מבטיחים שהפרויקט יעמוד בציפיות שלנו?",
    answer: "אנו משקיעים זמן רב בתהליך האפיון הראשוני כדי להבין לעומק את הציפיות, המטרות והצרכים שלכם. אנו עובדים בשיטת פיתוח אג'ילית (Agile) המאפשרת משוב מתמיד ואיטרציות שוטפות. במהלך הפרויקט, אנו מקיימים פגישות סטטוס קבועות ומספקים גישה למערכת ניהול הפרויקט שלנו, כך שתוכלו לעקוב אחר ההתקדמות בזמן אמת."
  }
];

const FaqSection = () => {
  const [openFaq, setOpenFaq] = useState<string | null>(faqs[0].id);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto">
        <div className="asym-grid">
          {/* Left: large heading */}
          <div className="lg:sticky lg:top-32 self-start">
            <div className="flex items-center gap-4 mb-6">
              <span className="section-index text-tech-blue">04 / 04</span>
              <span className="h-px w-12 bg-tech-blue/40" />
              <span className="eyebrow text-gray-500">FAQ</span>
            </div>
            <h2 className="heading-he display-lg text-dark mb-8" data-aos="fade-up">
              שאלות <br />
              <span className="gradient-text">נפוצות.</span>
            </h2>
            <p className="text-base text-gray-600 leading-relaxed max-w-sm mb-8">
              לא מצאתם את מה שחיפשתם? אנחנו כאן בשבילכם — דברו איתנו ישירות.
            </p>
            <MagneticButton onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              <Button
                id="faq_contact_button"
                className="btn-brand text-white px-8 py-4 text-sm uppercase tracking-wider"
              >
                דברו איתנו →
              </Button>
            </MagneticButton>
          </div>

          {/* Right: accordions */}
          <div>
            {faqs.map((faq, index) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="border-t border-gray-200 last:border-b"
                  data-aos="fade-up"
                  data-aos-delay={index * 60}
                >
                  <button
                    type="button"
                    id={`faq_question_toggle_${faq.id}`}
                    className="w-full flex justify-between items-center text-right py-6 group focus:outline-none"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq_answer_${faq.id}`}
                  >
                    <div className="flex items-start gap-5 flex-1">
                      <span className="section-index text-tech-blue mt-1.5 shrink-0">
                        0{index + 1}
                      </span>
                      <span className="text-lg lg:text-xl font-medium text-dark group-hover:text-tech-blue transition-colors">
                        {faq.question}
                      </span>
                    </div>
                    <div className="shrink-0 ml-4 w-9 h-9 flex items-center justify-center border border-gray-300 group-hover:border-tech-blue transition-colors" style={{ borderRadius: '2px' }}>
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>
                  {isOpen && (
                    <div
                      id={`faq_answer_${faq.id}`}
                      className="pb-6 pr-12 text-gray-600 leading-relaxed animate-fade-in"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
