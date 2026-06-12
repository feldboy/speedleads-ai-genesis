import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Bot, BrainCircuit, Check } from 'lucide-react';
import SpotlightCard from '@/components/effects/SpotlightCard';
import MagneticButton from '@/components/effects/MagneticButton';
import { scrollToSection } from '@/lib/scroll';

interface Service {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  button: string;
  icon: React.ElementType;
  price: string;
  deliveryTime: string;
}

const services: Service[] = [
  {
    id: 'service_advanced_digital_experiences',
    number: '01',
    title: 'אתרים שמוכרים',
    subtitle: 'Experiences',
    description:
      'אתרי תדמית יוקרתיים, דפי נחיתה ממוקדי המרה ו-E-Commerce חכם — מעוצבים אישית למותג שלך, בנויים למהירות.',
    features: [
      'עיצוב מותאם אישית למותג',
      'דפי נחיתה ממוקדי המרה',
      'SEO מתקדם וביצועים מעולים',
      'תמיכה ועדכונים שוטפים',
    ],
    button: 'בואו נתחיל בפרויקט',
    icon: Palette,
    price: 'החל מ-15,000 ₪',
    deliveryTime: '4–8 שבועות',
  },
  {
    id: 'service_automations',
    number: '02',
    title: 'אוטומציות שעובדות בשבילך',
    subtitle: 'Automation',
    description:
      'בוטים ותהליכים אוטומטיים שמייעלים את התפעול וחוסכים עשרות שעות בחודש — מוכנים ליישום מיידי.',
    features: [
      'בוטים חכמים לשירות לקוחות',
      'אוטומציה של משימות חוזרות',
      'דיווח ומעקב אוטומטיים',
      'אינטגרציה חלקה למערכות קיימות',
    ],
    button: 'גלו את הפתרונות',
    icon: Bot,
    price: 'החל מ-8,000 ₪',
    deliveryTime: '2–4 שבועות',
  },
  {
    id: 'service_ai_implementations',
    number: '03',
    title: 'AI בתוך העסק שלך',
    subtitle: 'Intelligence',
    description:
      'שילוב כלי AI מתקדמים במערכות שלך — משירות לקוחות מיידי ועד CRM שמסווג, מתעדף ועונה לבד.',
    features: [
      "צ'אטבוטים חכמים ומתקדמים",
      'ניתוח נתונים וחיזוי מגמות',
      'חיפוש חכם והמלצות מותאמות',
      'מעקב תוצאות בזמן אמת',
    ],
    button: 'שדרגו את המערכת',
    icon: BrainCircuit,
    price: 'החל מ-12,000 ₪',
    deliveryTime: '3–6 שבועות',
  },
];

function ServiceCards() {
  return (
    <section id="services" className="py-24 lg:py-32 relative" aria-labelledby="services_title">
      <div className="container mx-auto">
        {/* Header — asymmetric */}
        <div className="asym-grid items-end mb-16 lg:mb-20">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="section-index text-champagne">02 / 06</span>
              <span className="h-px w-12 bg-champagne/40" />
              <span className="eyebrow text-ivory/50">Services</span>
            </div>
            <motion.h2
              id="services_title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="heading-he display-lg text-ivory"
            >
              שלוש דרכים <br />
              <span className="serif-lux gradient-text">להאיץ את העסק.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-base lg:text-lg text-ivory/55 leading-relaxed max-w-md lg:justify-self-end"
          >
            כל פתרון נבנה סביב מטרה אחת: שהמערכת תעבוד בשבילך — לא להפך.
          </motion.p>
        </div>

        {/* Dossier cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="h-full"
              >
                <SpotlightCard
                  corners
                  id={service.id}
                  className="p-8 lg:p-9 h-full flex flex-col rounded transition-shadow duration-500"
                >
                  {/* Number + icon */}
                  <div className="flex items-start justify-between mb-8 relative z-10">
                    <span
                      className="font-tech gradient-text leading-none"
                      style={{ fontSize: '3.5rem', fontWeight: 600, letterSpacing: '-0.04em' }}
                      dir="ltr"
                    >
                      {service.number}
                    </span>
                    <div className="w-12 h-12 border border-champagne/25 flex items-center justify-center" style={{ borderRadius: '2px' }}>
                      <Icon className="w-6 h-6 text-tech-blue" />
                    </div>
                  </div>

                  <div className="eyebrow text-ivory/40 mb-2">{service.subtitle}</div>
                  <h3 className="heading-he text-ivory mb-4" style={{ fontSize: 'clamp(1.4rem, 2vw, 1.8rem)' }}>
                    {service.title}
                  </h3>
                  <p className="text-ivory/55 leading-relaxed text-sm mb-7 relative z-10">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 relative z-10">
                    {service.features.map((feature, fi) => (
                      <motion.li
                        key={feature}
                        initial={{ opacity: 0, x: 14 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 + i * 0.15 + fi * 0.08 }}
                        className="flex items-center gap-3 text-sm text-ivory/75"
                      >
                        <Check className="w-3.5 h-3.5 text-champagne shrink-0" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-auto relative z-10">
                    {/* Price row */}
                    <div className="flex items-center justify-between py-4 border-t border-ivory/10 mb-6">
                      <span className="font-tech text-champagne text-sm">{service.price}</span>
                      <span className="font-tech text-ivory/40 text-xs">{service.deliveryTime}</span>
                    </div>

                    <MagneticButton onClick={() => scrollToSection('contact')} className="w-full">
                      <button
                        id={`${service.id}_button`}
                        className="btn-ghost-lux w-full py-3.5 text-sm tracking-wide"
                      >
                        {service.button} ←
                      </button>
                    </MagneticButton>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ServiceCards;
