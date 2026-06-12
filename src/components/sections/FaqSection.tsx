import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import MagneticButton from '@/components/effects/MagneticButton';
import { scrollToSection } from '@/lib/scroll';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    id: 'faq_question_1',
    question: 'כמה זמן לוקח פרויקט ממוצע?',
    answer:
      'משך הזמן משתנה בהתאם לסוג הפרויקט ומורכבותו. בדרך כלל, דף נחיתה בסיסי מוכן תוך 1–2 שבועות, אתר תדמית תוך 3–4 שבועות, ופרויקטים מורכבים כמו חנויות אונליין או מערכות אוטומציה מותאמות אישית — 6–12 שבועות. לכל פרויקט נבנה לוח זמנים מפורט כבר בתחילת העבודה.',
  },
  {
    id: 'faq_question_2',
    question: 'האם אתם מציעים תמיכה לאחר סיום הפרויקט?',
    answer:
      'בהחלט. אנחנו מציעים חבילות תמיכה ותחזוקה שוטפת לאחר ההשקה — עדכונים, גיבויים, אבטחה, תיקוני באגים ושדרוגים. הקשר עם הלקוחות שלנו הוא לטווח ארוך, והמערכת ממשיכה לקבל ליווי גם אחרי העלייה לאוויר.',
  },
  {
    id: 'faq_question_3',
    question: 'אילו טכנולוגיות AI אתם משלבים?',
    answer:
      "אנחנו עובדים עם מגוון רחב של טכנולוגיות AI מתקדמות: צ'אטבוטים חכמים מבוססי LLM, מערכות המלצות אישיות, אלגוריתמי למידת מכונה לניתוח התנהגות משתמשים, חיפוש סמנטי, כלי יצירת תוכן אוטומטיים ואינטגרציות עם פלטפורמות מובילות כמו OpenAI ו-Google AI.",
  },
  {
    id: 'faq_question_4',
    question: 'מהו התהליך לעבודה משותפת?',
    answer:
      'התהליך בנוי משלבים ברורים: פגישת אפיון ראשונית, הצעת מחיר מפורטת, עיצוב ואישור קונספט, פיתוח בשלבים עם נקודות אישור, בדיקות מקיפות, השקה והדרכה — ולבסוף תמיכה שוטפת. לאורך כל הדרך אתם מעורבים ומקבלים עדכונים שוטפים.',
  },
  {
    id: 'faq_question_6',
    question: 'איך אתם מבטיחים שהפרויקט יעמוד בציפיות?',
    answer:
      "אנחנו משקיעים זמן רב באפיון הראשוני כדי להבין לעומק את המטרות והצרכים שלכם, ועובדים בשיטה אג'ילית שמאפשרת משוב מתמיד ואיטרציות שוטפות. במהלך הפרויקט מתקיימות פגישות סטטוס קבועות ויש לכם גישה מלאה למערכת ניהול הפרויקט — כך שאתם רואים את ההתקדמות בזמן אמת.",
  },
];

const FaqSection = () => {
  const [openFaq, setOpenFaq] = useState<string | null>(faqs[0].id);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 lg:py-32 relative">
      <div className="container mx-auto">
        <div className="asym-grid">
          {/* Sticky heading */}
          <div className="lg:sticky lg:top-32 self-start">
            <div className="flex items-center gap-4 mb-6">
              <span className="section-index text-champagne">05 / 06</span>
              <span className="h-px w-12 bg-champagne/40" />
              <span className="eyebrow text-ivory/50">FAQ</span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="heading-he display-lg text-ivory mb-8"
            >
              שאלות <br />
              <span className="serif-lux gradient-text">נפוצות.</span>
            </motion.h2>
            <p className="text-base text-ivory/55 leading-relaxed max-w-sm mb-8">
              לא מצאתם את מה שחיפשתם? אנחנו כאן בשבילכם — דברו איתנו ישירות.
            </p>
            <MagneticButton onClick={() => scrollToSection('contact')}>
              <button
                id="faq_contact_button"
                className="btn-lux px-8 py-4 text-sm tracking-wider"
              >
                דברו איתנו ←
              </button>
            </MagneticButton>
          </div>

          {/* Accordions */}
          <div>
            {faqs.map((faq, index) => {
              const isOpen = openFaq === faq.id;
              return (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="border-t border-ivory/10 last:border-b"
                >
                  <button
                    type="button"
                    id={`faq_question_toggle_${faq.id}`}
                    className="w-full flex justify-between items-center text-right py-6 group focus:outline-none focus-visible:ring-1 focus-visible:ring-champagne/60"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq_answer_${faq.id}`}
                  >
                    <div className="flex items-start gap-5 flex-1">
                      <span className="section-index text-champagne mt-1.5 shrink-0">
                        0{index + 1}
                      </span>
                      <span
                        className={`text-lg lg:text-xl font-medium transition-colors duration-300 ${
                          isOpen ? 'text-champagne-light' : 'text-ivory group-hover:text-champagne-light'
                        }`}
                      >
                        {faq.question}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className={`shrink-0 mr-4 w-9 h-9 flex items-center justify-center border transition-colors duration-300 ${
                        isOpen ? 'border-champagne/70 text-champagne' : 'border-ivory/20 text-ivory/60 group-hover:border-champagne/50'
                      }`}
                      style={{ borderRadius: '2px' }}
                    >
                      <Plus className="w-4 h-4" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq_answer_${faq.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-7 pr-12 text-ivory/60 leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
